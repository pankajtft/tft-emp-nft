import firebase from "./firebase";

const firebaseConfig = { apiKey: "AIzaSyClJVQhX79QEx-q-jmlpQ41nkIutYKMZ_M", 
authDomain: "tft-emp-nft.firebaseapp.com", 
projectId: "tft-emp-nft", 
storageBucket: "tft-emp-nft.appspot.com", 
messagingSenderId: "17028995638", 
appId: "1:17028995638:web:91cade3eafe1b805969697", 
measurementId: "G-118W3MEDVZ" };

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};
export const signin = () => { 
    auth.signInWithPopup(provider).catch(alert);};
    
export default firebaseConfig;