import React, { useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  // React States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setconfirmPasswordError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  
  

  const errors = {
    invalidEmail: "Email Must not be empty and must be valid",
    pass: "Password Should have a minimum length of 5",
    confirm: "Confirm Password should be equal to Password"
  };


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPassword(password) {
    return /(?=.{5,40}$)/.test(password);
  }
  const handleChange = (e, inputType) => {
    if(inputType === 'email'){
      if (!isValidEmail(e.target.value)) {
        setEmailError(errors.invalidEmail);
      } else {
        setEmailError(null);
      }
      setEmail(e.target.value);

    }
    if(inputType === 'password'){
      if (!isValidPassword(e.target.value)) {
        setPasswordError(errors.pass);
      } else {
        setPasswordError(null);
      }
      setPassword(e.target.value);

    }
    if(inputType === 'confirmPassword'){
      if (e.target.value !== password) {
        setconfirmPasswordError(errors.confirm);
      } else {
        setconfirmPasswordError(null);
      }
      setconfirmPassword(e.target.value);

    }

    
  }

  const handleSubmit = () => {
    setSpinner(true)
    if(registerForm){
      axios.post("https://reqres.in/api/register", {
        email,
        password
      }).then(resp => {
        if(resp?.data?.token){
          alert('Successfully registered, Please login now.')
          setRegisterForm(false)
          setSpinner(false)
        }
      }).catch(error => {
       alert(error?.response?.data?.error)
       setSpinner(false)
      })
    }else{
      axios.post("https://reqres.in/api/login", {
        email,
        password
      }).then(resp => {
        if(resp?.data?.token){
          alert('Congratulations! You have successfully Logged In!.')
          setSpinner(false)
        }
      }).catch(error => {
        if(error.code === 'ERR_BAD_REQUEST' && error.response.data.error == 'user not found'){
          alert('You need to register first');
          setSpinner(false)
          setRegisterForm(true)
        }
      })
    }
      
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
        <div className="input-container">
          <label>Email </label>
          <input type="text" value={email} onChange={e=> (handleChange(e, 'email'))} />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" value={password} name="pass" onChange={e=> (handleChange(e, 'password'))} />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        {
        registerForm && (<div className="input-container">
          <label>Confirm Password </label>
          <input type="password" value={confirmPassword} name="pass" onChange={e=> (handleChange(e, 'confirmPassword'))} />
          {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
        </div>)
        }
        {(emailError == null && passwordError == null && confirmPasswordError == null) && <div className="button-container">
          {spinner ? (<i class="fa fa-spinner fa-spin"></i>) : <input type="submit" value={registerForm ? 'Register' : 'Login'} onClick={handleSubmit} />}
        </div>
        }
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">{registerForm ? 'Sign Up' : 'Sign In'}</div>
        {renderForm}
      </div>
    </div>
  );
}

export default App;