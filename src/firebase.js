import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB1e9aheHRCYCQF8iNH9C3D1tZlSkYXAlY",
  authDomain: "fire-extinguisher-tracke-9e98f.firebaseapp.com",
  projectId: "fire-extinguisher-tracke-9e98f",
  storageBucket: "fire-extinguisher-tracke-9e98f.firebasestorage.app",
  messagingSenderId: "1068945798281",
  appId: "1:1068945798281:web:575102ab9851df0d870258",
  measurementId: "G-0M2WJ03MF0"
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
export const analytics = getAnalytics(app);

// Collection references
export const workspacesRef = collection(db, 'workspaces');

export default app;
