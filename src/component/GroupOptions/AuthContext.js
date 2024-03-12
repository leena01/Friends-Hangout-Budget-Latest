// AuthContext.js
import React, { createContext, useState ,useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from '../../firebase/firebase'
export const AuthContext = createContext();
// const firebaseConfig = {
//   apiKey: "AIzaSyDX0Aj-rYRAf_MnD_GJcxk82GcDZpQ0jFo",
//   authDomain: "hangoutfriendsbudget.firebaseapp.com",
//   projectId: "hangoutfriendsbudget",
//   storageBucket: "hangoutfriendsbudget.appspot.com",
//   messagingSenderId: "310365667729",
//   appId:  "1:310365667729:web:b74775cb1b2dd71ddfda30",
//   measurementId: "G-V1ZHQ7EBV6"
// };
// const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [setEmail,setPassword,setErrorMessage]=useState('')

  const signIn = async (email, password) => {
    try {
          // Attempt to sign in the user
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log('Sign-in successful:', user);
          
          // Clear the form and error message
          setEmail('');
          setPassword('');
          setErrorMessage('');
    
    } catch (error) {
      console.error('Sign-in Error:', error.message);
      setErrorMessage(error.message);
      throw error;
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign-out function
  const signOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Sign-out Error:', error.message);
      throw error;
    }
  };
  return (
    
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export {auth}

