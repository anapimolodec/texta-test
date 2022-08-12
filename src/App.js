import { useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import SignUp from './SignUp';
import Form from './Form';
import './App.css';
import { auth } from "./firebase-config";

function App() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {
    await signOut(auth);
  }

  return (
    <div className="App">
      <section className="container">
        <div className="image-wrapper">         
        </div> 
        <Form />
      </section>
    </div>
  );
}

export default App;
