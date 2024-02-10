// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAQUgmmHVOWOQvo6IKH3LgNjVFK79yjuo",
  authDomain: "tlr-controller.firebaseapp.com",
  projectId: "tlr-controller",
  storageBucket: "tlr-controller.appspot.com",
  messagingSenderId: "268288052952",
  appId: "1:268288052952:web:9d8fa6436cdc2185fa11ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)