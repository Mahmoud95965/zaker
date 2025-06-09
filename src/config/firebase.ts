import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, Auth, OAuthProvider } from 'firebase/auth';

// Firebase configuration object
export const firebaseConfig = {
  apiKey: "AIzaSyDgTnOb1Wiu-964QaV2Q1oxLYgWLJkqFsQ",
  authDomain: "zakerly0.firebaseapp.com",
  databaseURL: "https://zakerly0-default-rtdb.firebaseio.com",
  projectId: "zakerly0",
  storageBucket: "zakerly0.firebasestorage.app",
  messagingSenderId: "718838819739",
  appId: "1:718838819739:web:fb0c10967caeaee59d4f3e",
  measurementId: "G-TVZZCE0TF2"
};

// Initialize Firebase with error handling
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let googleProvider: GoogleAuthProvider;
let microsoftProvider: OAuthProvider;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  microsoftProvider = new OAuthProvider('microsoft.com');

  // Configure Google provider with recommended settings
  googleProvider.setCustomParameters({
    prompt: 'select_account',
    access_type: 'offline',
  });

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

// Export initialized instances
export { app, db, auth, googleProvider, microsoftProvider };
