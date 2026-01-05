import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPGoUn25Di0xdnu3Xekyepuv5kDPLa8Yw",
  authDomain: "extinguishertracker.firebaseapp.com",
  projectId: "extinguishertracker",
  storageBucket: "extinguishertracker.firebasestorage.app",
  messagingSenderId: "887735502448",
  appId: "1:887735502448:web:d13c096353a56bd3a356b5",
  measurementId: "G-NWJH1QFWG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence (queues writes, serves cached reads)
try {
  enableIndexedDbPersistence(db).catch((err) => {
    // Ignore known cases (multiple tabs) but log others for visibility
    if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
      console.warn('Firestore persistence error:', err);
    }
  });
} catch (e) {
  console.warn('Failed to enable Firestore persistence:', e);
}
export const auth = getAuth(app);

// Initialize Analytics only in browser environment
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn('Failed to initialize Firebase Analytics:', e);
}
export { analytics };

// Collection references
export const workspacesRef = collection(db, 'workspaces');

export default app;
