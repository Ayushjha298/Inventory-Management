import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTj_n-97uWMUa0tI1c1vCC_BJJ6nSPY_s",
  authDomain: "test-1b1bb.firebaseapp.com",
  projectId: "test-1b1bb",
  storageBucket: "test-1b1bb.appspot.com",
  messagingSenderId: "345722560928",
  appId: "1:345722560928:web:7a6bfce7a2d9300a2cc4c5",
  measurementId: "G-F719XMP1TJ"
}

firebase.initializeApp(firebaseConfig);

export { firebase };
