import React, { createContext, useState, useContext, useEffect } from 'react';
import ProtonService from '../services/proton.service';
import firebaseService from '../services/firebase.service';

interface User {
  actor: string;
  permission: string;
  avatar: string;
  createdAt: Date;
  name: string;
  isMember: boolean;
  memberLevel: string;
}

interface AuthResponse {
  success: boolean;
  user?: any;
  error?: any;
}

interface AuthContext {
  currentUser: User | null;
  authenticate?: () => Promise<AuthResponse>;
  signout?: () => void;
  updateMember?;
}

const authContext = createContext<AuthContext>({
  currentUser: null,
});

export const useAuthContext = () => {
  const {
    currentUser,
    authenticate,
    signout,
    updateMember,
  } = useContext(authContext);

  return {
    currentUser,
    authenticate,
    signout,
    updateMember,
  };
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const initialUser = JSON.parse(localStorage.getItem('AUTH_USER_PROTON_VIP'));
    if (initialUser) {
      ProtonService.restoreSession();
      setCurrentUser(initialUser);
    } else {
      setCurrentUser(null);
    }
  }, []);

  const authenticate = async (): Promise<AuthResponse> => {
    try {
      let user = await ProtonService.login();

      if (!user) {
        throw new Error();
      }

      const query = await firebaseService
        .collection('members')
        .where("user", "==", user.actor)
        .get();

      if (!query.empty) {
        let member;
        query.forEach((doc) => {
          member = doc.data();
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
    }
  };

  const updateMember = async (user, level) => {
    user.isMember = true;
    user.memberLevel = level;
    localStorage.setItem('AUTH_USER_PROTON_VIP', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signout = async () => {
    await ProtonService.logout();
    setCurrentUser(null);
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        updateMember,
        authenticate,
        signout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
