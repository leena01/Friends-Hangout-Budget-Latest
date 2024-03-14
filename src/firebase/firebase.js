

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// import { getFirestore } from 'firebase/firestore';
// const firestore = getFirestore();
const firebaseConfig = {
  apiKey: "AIzaSyDX0Aj-rYRAf_MnD_GJcxk82GcDZpQ0jFo",
  authDomain: "hangoutfriendsbudget.firebaseapp.com",
  projectId: "hangoutfriendsbudget",
  storageBucket: "hangoutfriendsbudget.appspot.com",
  messagingSenderId: "310365667729",
  appId:  "1:310365667729:web:b74775cb1b2dd71ddfda30",
  measurementId: "G-V1ZHQ7EBV6"
};

// firebase.initializeApp(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth(); // Export the Firebase Authentication instance if you're using it
// export const firestore = firebase.firestore();

export default app; // Export the Firebase app instance as default