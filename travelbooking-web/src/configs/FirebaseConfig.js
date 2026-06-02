import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBLyByTq3J1t9F7ZCSX2jcSRiy6ENM0dDQ",
  authDomain: "ahtravelbookingweb.firebaseapp.com",
  databaseURL: "https://ahtravelbookingweb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ahtravelbookingweb",
  storageBucket: "ahtravelbookingweb.firebasestorage.app",
  messagingSenderId: "448989188726",
  appId: "1:448989188726:web:d535ee7ec89b1bfa0c0557",
  measurementId: "G-GGEV7CVN0H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const auth = getAuth(app);