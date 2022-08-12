import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3JbxBMCWvK7TRj1vuxykZadFGYvNoOKg",
  authDomain: "texta-test.firebaseapp.com",
  databaseURL: "https://texta-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "texta-test",
  storageBucket: "texta-test.appspot.com",
  messagingSenderId: "640475649180",
  appId: "1:640475649180:web:3e28ba69d7106bcf218959",
  measurementId: "G-T9MR6QPP1H"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;