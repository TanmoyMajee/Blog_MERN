// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXbcKPV6MRWGFhWsqv_vGmwxzjpG16va4",
  authDomain: "blog-image-40829.firebaseapp.com",
  projectId: "blog-image-40829",
  storageBucket: "blog-image-40829.appspot.com",
  messagingSenderId: "293002530241",
  appId: "1:293002530241:web:4d1db5860fcb4d64a2f340",
  measurementId: "G-T6DPLMV0TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app)

export{app,storage}