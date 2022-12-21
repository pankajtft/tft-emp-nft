
import { initializeApp , getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD1EROsC3EeaGOwmBenrVe8_glT16_AJGM",
  authDomain: "nfttft-36fe0.firebaseapp.com",
  projectId: "nfttft-36fe0",
  storageBucket: "nfttft-36fe0.appspot.com",
  messagingSenderId: "299404230297",
  appId: "1:299404230297:web:82754ed24d702f970b0208",
  measurementId: "G-FFRX01VRDD"
};
//Sara firebase Account Key
  // const firebaseConfig = { 
  //         apiKey: "AIzaSyClJVQhX79QEx-q-jmlpQ41nkIutYKMZ_M", 
  //         authDomain: "tft-emp-nft.firebaseapp.com", 
  //         projectId: "tft-emp-nft", 
  //         storageBucket: "tft-emp-nft.appspot.com", 
  //         messagingSenderId: "17028995638", 
  //         appId: "1:17028995638:web:91cade3eafe1b805969697", 
  //         measurementId: "G-118W3MEDVZ" };
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const auth = getAuth();
export default firebaseConfig;
