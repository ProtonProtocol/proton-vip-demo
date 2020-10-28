import React, { createContext, useState, useContext } from 'react';
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
  const initialUser = JSON.parse(localStorage.getItem('AUTH_USER'));
  if (initialUser) {
    ProtonService.restoreSession();
  }

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser ? initialUser : null)

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

      localStorage.setItem('AUTH_USER', JSON.stringify(user));
      setCurrentUser(user);

      return {
        success: true,
        user,
      };
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateMember = async (user, level) => {
    user.isMember = true;
    user.memberLevel = level;
    localStorage.setItem('AUTH_USER', JSON.stringify(user));
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
