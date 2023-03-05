// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs9cBskFtv1jeiwP3x2OsZGiFVowga190",
  authDomain: "burzaucebnicga.firebaseapp.com",
  projectId: "burzaucebnicga",
  storageBucket: "burzaucebnicga.appspot.com",
  messagingSenderId: "449675713998",
  appId: "1:449675713998:web:bb0112e13dfd9c566a1f9f",
  measurementId: "G-73F0P21FPC",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
