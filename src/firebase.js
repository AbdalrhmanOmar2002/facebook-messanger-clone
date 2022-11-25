// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8xIO75LzAtxn27e1SlNygm3r8urJP4T4",
  authDomain: "facebook-messanger-clone-d72f0.firebaseapp.com",
  projectId: "facebook-messanger-clone-d72f0",
  storageBucket: "facebook-messanger-clone-d72f0.appspot.com",
  messagingSenderId: "484952205480",
  appId: "1:484952205480:web:99a5c50816350c7030fa9d",
  measurementId: "G-6EFBTPJTG3",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const analytics = getAnalytics(app);
