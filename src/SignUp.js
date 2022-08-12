import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import './SignUp.css';
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [usedEmail, setUsedEmail] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          set(ref(db, "users/" + userCredential.user.uid), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            date: dob,
            message: message,
          })
          set(ref(db, "emails/"), {
            
            email: email,
            
          });
        })
        .catch(error => console.log(error.message));
      
    }
    onRegister();
  };
  
    
  
  useEffect(() => {
    const checkEmail = () => {
        const users = ref(db, 'emails/');
        onValue(users, (snapshot) => {
          const data = snapshot.val();
          let exists = Object.values(data).includes(email);
          setUsedEmail(exists);
          console.log("RUNNING!", exists)
        });
    
    }
    checkEmail();
  }, [email]);

  return (
    <div>
      <div> 
      </div>

      <form className="signupForm" onSubmit={handleSubmit}>
        <label for="firstname"> First Name </label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          required
          name="firstname"
        ></input>
        <label for="lastname"> Last Name </label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          required
          name="lastname"
        ></input>
        <label for="dob"> Date of Birth </label>
        <input 
          type="date" 
          name="dob"
          onChange={(e) => setDob(e.target.value)}
          ></input>
        <label for="email"> Email Address </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
        ></input>
        
        <input
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          
          type="password"
        ></input>
        <input
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          required
          type="text"
        ></input>

        <button>Sign Up</button>
      </form>
      <p> {error ? error : ""} </p>
      
    </div>
  );
};

export default SignUp;