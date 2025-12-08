import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForTesting123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "meal-planner-demo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://meal-planner-demo-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "meal-planner-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "meal-planner-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const hasFirebaseCredentials = Boolean(import.meta.env.VITE_FIREBASE_PROJECT_ID);
