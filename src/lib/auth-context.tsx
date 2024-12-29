import React, { createContext, useContext } from 'react';

// Mock authentication context that always returns authenticated state
interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: true,
  user: {
    id: 'mock-user-id',
    name: 'Demo User',
    email: 'demo@interviewmaster.ai'
  }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{
      isAuthenticated: true,
      user: {
        id: 'mock-user-id',
        name: 'Demo User',
        email: 'demo@interviewmaster.ai'
      }
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
