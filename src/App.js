import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './component/GroupOptions/SignIn.js'
import SignUp from './component/GroupOptions/SignUp.js';
import MyGroup from './component/GroupOptions/MyGroup.js';

import GroupOptions from './component/GroupOptions/GroupOptions.js';

import { AuthProvider } from './component/GroupOptions/AuthContext.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import StickyNote from './component/StickyNote/StickyNote';


const App = () => {
  useEffect(() => {
    // Your Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDX0Aj-rYRAf_MnD_GJcxk82GcDZpQ0jFo",
      authDomain: "hangoutfriendsbudget.firebaseapp.com",
      projectId: "hangoutfriendsbudget",
      storageBucket: "hangoutfriendsbudget.appspot.com",
      messagingSenderId: "310365667729",
      appId:  "1:310365667729:web:b74775cb1b2dd71ddfda30",
      measurementId: "G-V1ZHQ7EBV6"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  return (
    
  
    <div className="App">
        <AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<SignIn />}  />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/group-options" element={<GroupOptions/>} />
          <Route path="/group-options/MyGroup" element={<MyGroup/>} />
       
        </Routes>
      </div>
    </Router>
    </AuthProvider>
   
    
    </div>
    
  );
};

export default App;
