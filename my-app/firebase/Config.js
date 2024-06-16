import { initializeApp } from "firebase/app";
// import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAE2PmgDhj0QMSVb39VMmW3MIMNQ3ij2yM",
  authDomain: "task303-4a14c.firebaseapp.com",
  projectId: "task303-4a14c",
  storageBucket: "task303-4a14c.appspot.com",
  messagingSenderId: "33969721278",
  appId: "1:33969721278:web:b58648530a37eff54633ef",
};

const getTimeStamp = () => {
  return serverTimestamp();
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth, getTimeStamp };
