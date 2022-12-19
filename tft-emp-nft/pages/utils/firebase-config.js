// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1EROsC3EeaGOwmBenrVe8_glT16_AJGM",
  authDomain: "nfttft-36fe0.firebaseapp.com",
  projectId: "nfttft-36fe0",
  storageBucket: "nfttft-36fe0.appspot.com",
  messagingSenderId: "299404230297",
  appId: "1:299404230297:web:82754ed24d702f970b0208",
  measurementId: "G-FFRX01VRDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);