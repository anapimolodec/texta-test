import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import './SignUp.css';
import './radio.css';

const Form = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [choice, setChoice] = useState("");
  const [gender, setGender] = useState("");
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [error, setError] = useState("");
  const [usedEmail, setUsedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [short, setShort] = useState(true);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step+1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step-1);

  };
   
  const cleanFields = () => {
    setFirstName("");
    setEmail("");
    setPassword("");
    setDob("");
    setAddress("");
    setMessage("");
    setChoice("");
    setGender("");
    setOption1(false);
    setOption2(false);
  }


  const submitForm = (e) => {
    e.preventDefault();
    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          set(ref(db, "users/" + userCredential.user.uid), {
            firstName: firstName,
            email: email,
            date: dob,
            message: message,
            address: address,
            choice: choice,
            gender: gender,
            option1: option1,
            option2: option2,
          })

          cleanFields();
          setSubmitted(true);
        })
        .catch(error => console.log(error.message));
      
    }
    onRegister();
  };


  
  useEffect(() => {
    
    const checkEmail2 = () => {
        const users = ref(db, 'users/');
        onValue(users, (snapshot) => {
          const data = snapshot.val();
      
          let arr = Object.keys(data);
          for (let i=0; i<arr.length; i++) {
            let existingEmail = data[arr[i]].email;
            if (existingEmail != email) {
              setUsedEmail(false);
              console.log(existingEmail, email)
            } else {
              setUsedEmail(true);
              console.log("HERE!", email, usedEmail)
              return;
            }
          }
          
        });
      
    
    }
    console.log(usedEmail)
    checkEmail2();    
  }, [email]);
  
  const passwordCheck = (e) => {
    let size = e.length;
    if (size > 6) {
        setShort(false);
    } else {
      setShort(true);
    }
    setPassword(e);
  }

  return (
    <div className="form-wrapper">
      <ol>
        <li className={step == 1 ? "active" : step > 1 ? "done" : ""}> Sign Up </li>
        <li className={step == 2 ? "active" : step > 2 ? "done" : ""}> Message </li>
        <li className={step == 3 ? "active" : ""}> Checkbox </li> 
      </ol>
      <div className="form-container">
        <form className="signupForm" id="form">
        {step <= 1 ?  
        
        <fieldset className="step1">

          <legend>Sign Up <p className="pagination"> Step {step}/3 </p></legend>
            <div className="field">
              <label for="firstname"> First Name </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                required
                name="firstname"
                value={firstName}
              ></input>
            </div>
            <div className="field">
              <label for="password"> Password </label>
              <input
                onChange={(e) => passwordCheck(e.target.value)}
                required
                type="password"
                name="password"
                className={short ? "redborder" : ""}

              ></input>
              {short ? <p className="error-message redtext"> Password should be more than 6 char </p> : ""}
            </div>
            <div className="field">
              <label for="dob"> Date of Birth </label>
              <input 
                type="date" 
                name="dob"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                ></input>
            </div>
            <div className="field">
              <label for="email" className={usedEmail ? "redtext" : ""}> Email Address </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                value={email}
                className={usedEmail ? "redborder" : ""}
              ></input>
              {usedEmail ? <p className="error-message redtext"> This email is already used </p> : ""}
            </div>

            <div className="field full">
              <label for="address"> Address </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                required
                name="address"
                value={address}
              ></input>
            </div>
          
        </fieldset> : step == 2 ?
         
        <fieldset className="step2">
          <legend>Message <p className="pagination"> Step {step}/3 </p></legend>
          <div className="field full">
            <label for="message"> Message </label>
            <textarea
              placeholder="message"
              onChange={(e) => setMessage(e.target.value)}
              required
              type="text"
              name="message"
              form="form"
              value={message}
              rows="10" cols="10" maxlength="200"
            ></textarea>
          </div>
          <div className="radio-row">
            <div className="radio-choice"> 
              <input type="radio" id="choice1"
               name="contact" value="choice1" onChange={e => setChoice(e.target.value)}></input>
              <label for="choice1"> The number one choice </label>
            </div> 
            <div className="radio-choice">
              <input type="radio" id="choice2"
               name="contact" value="choice2" onChange={e => setChoice(e.target.value)}></input>
              <label for="choice2"> The number two choice</label>
            </div>
          </div>
        </fieldset>
        :

        <fieldset className="step3">
          <legend>Checkbox <p className="pagination"> Step {step}/3 </p></legend>
          <div className="radio-row gender">
            <label className="radio-choice gender-choice"> 
              <input type="radio" 
               name="gender" value="male" onClick={() => setGender('male')}></input>
              <div className="male-img"></div>
              
            </label> 
            <label className="radio-choice gender-choice">
              <input type="radio" 
               name="gender" value="female" onClick={() => setGender('female')}>
               </input>
               <div className="female-img "></div>
               
            </label>
          </div>

          <label class="checkbox-row"> I want to add this option
            <input type="checkbox" value="option1" onClick={() =>  setOption1(option1 => !option1)}/>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-row">Let me check on this checkbox and choose some cool stuff
            <input type="checkbox" value="option2" onClick={() => setOption2(option2 => !option2)} />
            <span class="checkmark"></span>
          </label>
        </fieldset>
      }
      </form>
      </div>
      <div className="buttons-wrapper">
        
        <button onClick={prevStep} style={ step == 1 ? {display: 'none'} : {}} >Back</button>
        { step == 3 ? <button onClick={submitForm} className="next"> {submitted ? 'Submitted!' : 'Submit'} </button>
        : <button onClick={nextStep} className="next"> Next Step</button> }
        
        
      </div>
      
    </div>
  );
};

export default Form;