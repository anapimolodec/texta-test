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

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step+1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(step-1);

  };
   



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
              ></input>
            </div>
            <div className="field">
              <label for="password"> Password </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
              ></input>
            </div>
            <div className="field">
              <label for="dob"> Date of Birth </label>
              <input 
                type="date" 
                name="dob"
                onChange={(e) => setDob(e.target.value)}
                ></input>
            </div>
            <div className="field">
              <label for="email"> Email Address </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
              ></input>
            </div>

            <div className="field full">
              <label for="address"> Address </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                required
                name="address"
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
              <input type="radio" id="male"
               name="gender" value="male" onChange={e => {setGender(e.target.value); console.log(gender);}}></input>
              <div className="male-img"></div>
              
            </label> 
            <label className="radio-choice gender-choice">
              <input type="radio" id="female"
               name="gender" value="female" onChange={e => {setGender(e.target.value); console.log(gender);}}>
               </input>
               <div className="female-img "></div>
               
            </label>
          </div>

          <label class="checkbox-row"> I want to add this option
            <input type="checkbox" value="option1" onChange={e => setOption1(!option1)}/>
            <span class="checkmark"></span>
          </label>
          <label class="checkbox-row">Let me check on this checkbox and choose some cool stuff
            <input type="checkbox" value="option2" onChange={e => setOption2(!option2)} />
            <span class="checkmark"></span>
          </label>
        </fieldset>
      }
      </form>
      </div>
      <div className="buttons-wrapper">
        
        <button onClick={prevStep} style={ step == 1 ? {display: 'none'} : {}} >Back</button>
        { step == 3 ? <button onClick={submitForm} className="next"> Submit </button>
        : <button onClick={nextStep} className="next"> Next Step</button> }
        
        
      </div>
      
    </div>
  );
};

export default Form;