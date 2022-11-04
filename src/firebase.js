import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtQD2cFYNtBmINF16UUf96BlW4veNYoEU",
  authDomain: "edu2gether-67cc1.firebaseapp.com",
  projectId: "edu2gether-67cc1",
  storageBucket: "edu2gether-67cc1.appspot.com",
  messagingSenderId: "261472646998",
  appId: "1:261472646998:web:7c27ef3065a007fbf788f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
