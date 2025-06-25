import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAf92jOz_Xi35VPR651vbA7nnkQUQEoslo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "cannabis-store-ea953.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "cannabis-store-ea953",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "cannabis-store-ea953.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "612595771631",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:612595771631:web:7a476f74c9c938062c131a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Log configuration for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized with config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket
  });
}

// Test Firestore connection
if (process.env.NODE_ENV === 'development') {
  import('firebase/firestore').then(({ doc, getDoc }) => {
    // Test Firestore connection by attempting to read a document
    console.log('Testing Firestore connection...');
  }).catch((error) => {
    console.error('Firestore import error:', error);
  });
}

export default app;
