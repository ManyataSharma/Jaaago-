import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAp2o1_C_9KiriL2j4H7pJxVgwM4OEMumI",
  authDomain: "jaaago-1f065.firebaseapp.com",
  projectId: "jaaago-1f065",
  storageBucket: "jaaago-1f065.firebasestorage.app",
  messagingSenderId: "206624063038",
  appId: "1:206624063038:web:57b8f0be9de18c21a09b6f",
  measurementId: "G-FN26VJZ0JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 