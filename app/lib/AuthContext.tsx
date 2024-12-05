'use client'; // Ensure this is a client-side component

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { initializeFirebase } from './firebaseClient';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {auth} = initializeFirebase();

  useEffect(() => {
    if(!auth){
      return
    }
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const logout = async () => {
    if(!auth) {
      return
    }
    try {
      await auth.signOut();
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Explicitly check if auth is initialized
  const { user, loading, logout } = context;

  if (!user && loading) {
    return { user: null, loading: true, logout };  // Safely return when loading or no user
  }

  return { user, loading, logout };
};
