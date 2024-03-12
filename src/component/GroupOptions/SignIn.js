// SignIn.js
import { Link,useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import GroupOptions from './GroupOptions';
import { auth } from '../../firebase/firebase';

import './StyleSignIn.css'

// Initialize useNavigate   

const SignIn = () => {
  document.body.classList.add('signin-body');
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication status
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("true case in sign in");
      setEmail('');
          setPassword('');
          setErrorMessage('');
      // Handle successful sign-in
      // After successful sign-in, you might want to update the authentication state
      // and show components that are accessible to authenticated users.
      // Assuming you have a state to track authentication status, you can update it here.
      setAuthenticated(true);
      navigate('/group-options');
    } catch (error) {
      console.error('Sign-in Error:', error.message);
      setErrorMessage(error.code === 400 ? 'User not found' : 'Invalid credentials');
    }
  };

  return (
    
    <div>
      
        <div className="wooden-board main-heading"><center><h2 >HangOUT Friends Budget</h2></center></div>
      <center ><h2>SIGN IN</h2></center>
      <form onSubmit={handleSignIn}>
        {/* Display error message if present */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        {/* Email input field */}
        <el-row>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </el-row>
       
        
        {/* Password input field */}
        <el-row>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        </el-row>
       
        {/* Sign-in button */}
        <button className="cloud-button" type="submit">Sign In</button>
        <p>Don't have an account? <Link to="/signup" ><b>Sign Up</b></Link></p>
      </form>
    
  </div>
  );
};

export default SignIn;
