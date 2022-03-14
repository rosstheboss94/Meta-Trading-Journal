import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDuBW4JEsVWaJRwrYZv_L1NMyOKpR38M7I",
  authDomain: "metatrading-c9240.firebaseapp.com",
  databaseURL: "https://metatrading-c9240-default-rtdb.firebaseio.com",
  projectId: "metatrading-c9240",
  storageBucket: "metatrading-c9240.appspot.com",
  messagingSenderId: "389054312023",
  appId:"1:389054312023:web:f637be2b51daf0e99f7d12",
  measurementId: "${config.measurementId}",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage(firebaseApp);

export default firebaseApp;


