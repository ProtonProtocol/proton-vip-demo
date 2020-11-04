import React, { createContext, useState, useContext, useEffect } from 'react';
import ProtonService from '../services/proton.service';
import firebaseService from '../services/firebase.service';

export type User = {
  actor: string;
  permission: string;
  avatar: string;
  createdAt: Date;
  name: string;
  isMember?: boolean;
  memberLevel?: string;
};

interface AuthResponse {
  success: boolean;
  user?: any;
  error?: any;
}

interface AuthContext {
  currentUser: User;
  authenticate: () => Promise<AuthResponse>;
  signout: () => void;
  updateMember: (user: User, level: string) => void;
}

interface AuthProviderProps {
  children: JSX.Element;
}

interface Member {
  user: string;
  level: string;
}

export const defaultCurrentUser = {
  actor: '',
  permission: '',
  avatar: '',
  createdAt: new Date(),
  name: '',
  isMember: false,
  memberLevel: '',
};

const authContext = createContext<AuthContext>({
  currentUser: defaultCurrentUser,
  authenticate: () => Promise.resolve({ success: false }),
  signout: () => {},
  updateMember: () => {},
});

export const useAuthContext = (): AuthContext => {
  const { currentUser, authenticate, signout, updateMember } = useContext(
    authContext
  );

  return {
    currentUser,
    authenticate,
    signout,
    updateMember,
  };
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>(defaultCurrentUser);

  useEffect(() => {
    const token: string = localStorage.getItem('AUTH_USER_PROTON_VIP') || '';
    if (token) {
      const initialUser = JSON.parse(token);
      ProtonService.restoreSession();
      setCurrentUser(initialUser);
    } else {
      setCurrentUser(defaultCurrentUser);
    }

    document.addEventListener('backToSelector', () => {
      authenticate();
    });
  }, []);

  const authenticate = async (): Promise<AuthResponse> => {
    try {
      let user = await ProtonService.login();

      if (!user) {
        throw new Error();
      }

      const query = await firebaseService
        .collection('members')
        .where('user', '==', user.actor)
        .get();

      if (!query.empty) {
        let member: Member = { level: '', user: '' };
        query.forEach((doc) => {
          member = doc.data() as Member;
        });
        user.isMember = true;
        user.memberLevel = member.level;
      }

      localStorage.setItem('AUTH_USER_PROTON_VIP', JSON.stringify(user));
      setCurrentUser(user);

      return {
        success: true,
        user,
      };
    } catch (err) {
      console.warn('Login Error', err);
      return {
        success: false,
      };
    }
  };

  const updateMember = async (user: User, level: string) => {
    user.isMember = true;
    user.memberLevel = level;
    localStorage.setItem('AUTH_USER_PROTON_VIP', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signout = async () => {
    await ProtonService.logout();
    localStorage.removeItem('AUTH_USER_PROTON_VIP');
    setCurrentUser(defaultCurrentUser);
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        updateMember,
        authenticate,
        signout,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
