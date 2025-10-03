import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, Auth, OAuthProvider } from 'firebase/auth';

// Firebase configuration object (loaded from Vite env)
const readEnv = (key: string): string => {
  const val = (import.meta as any).env?.[key];
  return typeof val === 'string' ? val.trim() : '';
};

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

requiredKeys.forEach((k) => {
  const v = readEnv(k);
  if (!v) {
    console.error(`[Firebase] Missing env: ${k}`);
  }
});

const projectId = readEnv('VITE_FIREBASE_PROJECT_ID');
if (projectId.endsWith('.')) {
  console.error('[Firebase] Invalid VITE_FIREBASE_PROJECT_ID: must not end with a dot. Fix your .env');
  throw new Error('Invalid VITE_FIREBASE_PROJECT_ID');
}

export const firebaseConfig = {
  apiKey: readEnv('VITE_FIREBASE_API_KEY'),
  authDomain: readEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  databaseURL: readEnv('VITE_FIREBASE_DATABASE_URL') || undefined,
  projectId,
  storageBucket: readEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: readEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: readEnv('VITE_FIREBASE_APP_ID'),
  measurementId: readEnv('VITE_FIREBASE_MEASUREMENT_ID') || undefined
} as const;

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
