// SignUp.js
import React, { useState } from 'react';
import "./SignUp.css";
import app from '../../firebase/firebase.js'


import { auth } from '../../firebase/firebase.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  document.body.classList.add('signup-body');
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential =await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // User signed up successfully
         // Add user data Wto Firestore
         debugger
         await app.firestore().collection('users').doc(user.uid).set({
          email: user.email,
          // Add more user data as needed
        });
  
    } catch (error) {
      setError(error.message);
      console.error('Sign-up Error:', error.message);
    }
  };

  return (
    <div className="list-container">
      <h2><center>Sign Up</center></h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button   className="cloud-button"  type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;
