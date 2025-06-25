'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Define types for our context
type UserRole = 'admin' | 'customer' | null;

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  loading: boolean;  signup: (email: string, password: string, role: 'admin' | 'customer') => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Auth Context with default values
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);  // Register a new user
  const signup = async (email: string, password: string, role: 'admin' | 'customer') => {
    try {
      console.log('Attempting to create user with email:', email, 'and role:', role);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Create a user document in Firestore with the selected role
      console.log('Creating user document in Firestore...');
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role,        createdAt: new Date().toISOString()
      });
      console.log('User document created in Firestore successfully');    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Failed to create account. Please try again.');
    }
  };
  // Login existing user
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    return signOut(auth);
  };

  // Get user role from Firestore
  const getUserRole = async (uid: string): Promise<UserRole> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        return role === 'admin' || role === 'customer' ? role : null;
      }
      return null;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
