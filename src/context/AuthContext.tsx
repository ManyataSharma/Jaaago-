import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  verified: boolean;
  dob?: string;
  pincode?: string;
  state?: string;
  district?: string;
  userType?: 'citizen' | 'authority' | 'partner' | 'admin';
  govId?: string;
  department?: string;
  jurisdiction?: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'citizen' | 'authority' | 'partner' | 'admin' | null;
  login: (userData: User, type: string) => void;
  logout: () => void;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  registerUser: (userData: User, password: string) => Promise<void>;
  registerAuthority: (userData: User, password: string) => Promise<void>;
  registerAdmin: (userData: User, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'citizen' | 'authority' | 'partner' | 'admin' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          setUserType(userData.userType || 'citizen');
        }
      } else {
        setUser(null);
        setUserType(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const registerUser = async (userData: User, password: string) => {
    try {
      if (!userData.email) {
        throw new Error('Email is required for registration');
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
      
      const userWithType: User = {
        ...userData,
        id: userCredential.user.uid,
        userType: 'citizen',
        verified: true
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userWithType);
      
      setUser(userWithType);
      setUserType('citizen');
      
      // Store in localStorage for persistence
      localStorage.setItem('jaaago_user', JSON.stringify(userWithType));
      localStorage.setItem('jaaago_userType', 'citizen');
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const registerAuthority = async (userData: User, password: string) => {
    try {
      if (!userData.email) {
        throw new Error('Email is required for authority registration');
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
      
      const userWithType: User = {
        ...userData,
        id: userCredential.user.uid,
        userType: 'authority',
        verified: true
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userWithType);
      
      setUser(userWithType);
      setUserType('authority');
      
      // Store in localStorage for persistence
      localStorage.setItem('jaaago_user', JSON.stringify(userWithType));
      localStorage.setItem('jaaago_userType', 'authority');
    } catch (error) {
      console.error('Error registering authority:', error);
      throw error;
    }
  };

  const registerAdmin = async (userData: User, password: string) => {
    try {
      if (!userData.email) {
        throw new Error('Email is required for admin registration');
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
      
      const userWithType: User = {
        ...userData,
        id: userCredential.user.uid,
        userType: 'admin',
        verified: true
      };

      // Save user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userWithType);
      
      setUser(userWithType);
      setUserType('admin');
      
      // Store in localStorage for persistence
      localStorage.setItem('jaaago_user', JSON.stringify(userWithType));
      localStorage.setItem('jaaago_userType', 'admin');
    } catch (error) {
      console.error('Error registering admin:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  const login = (userData: User, type: string) => {
    setUser(userData);
    setUserType(type as any);
    localStorage.setItem('jaaago_user', JSON.stringify(userData));
    localStorage.setItem('jaaago_userType', type);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserType(null);
      localStorage.removeItem('jaaago_user');
      localStorage.removeItem('jaaago_userType');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      userType, 
      login, 
      logout, 
      isLoading,
      signInWithEmail,
      registerUser,
      registerAuthority,
      registerAdmin,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};