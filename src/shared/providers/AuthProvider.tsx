import React, { createContext, useState } from 'react'

import ProtonService from '../services/proton.service';
import { User } from '../types'

interface AuthResponse {
  success: boolean
  user?: any
  error?: any
}

interface AuthContext {
  isAuthenticated: boolean
  currentUser: User | null
  authenticate?: () => Promise<AuthResponse>
  signout?: () => void
}

export const authContext = createContext<AuthContext>({
  isAuthenticated: false,
  currentUser: null,
})

const AuthProvider = ({ children }) => {

  const initialUser = localStorage.getItem('AUTH_USER')
  if (initialUser) {
    ProtonService.restoreSession();
  }
  const hasUser = !!initialUser
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!(hasUser && initialUser)
  )
  const [currentUser, setCurrentUser] = useState<User | null>(JSON.parse(initialUser))

  const authenticate = async (): Promise<AuthResponse> => {
    try {
      const user = await ProtonService.login();
      if (!user) {
        throw new Error();
      }
      setCurrentUser(user)
      setIsAuthenticated(true)
      return {
        success: true,
        user,
      };
    } catch (err) {
      console.log("error", err);
    }
  }

  const signout = async () => {
    await ProtonService.logout();
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        authenticate,
        signout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
