import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
//  passwd : process.env.REACT_APP_PASSWORD,
//  email : process.env.REACT_APP_EMAIL,
// };

const firebaseConfig = {
    apiKey : 'AIzaSyA2duUPsmzfETLcHBuRTl_NtF8FkBp2VE4',
  authDomain: 'cfbconta.firebaseapp.com',
  databaseURL:'https://cfbconta.firebaseio.com',
  projectId: "cfbconta",
  storageBucket: 'cfbconta.appspot.com',
  messagingSenderId: '958573187',
  // appId:'1:958573187:web:0d0c17c8c784c3e59ac9b6',
  // measurementId: 'G-E8QYLJXVNW',
  appId: "1:958573187:web:d3c8b5cd6700daed9ac9b6",
  measurementId: "G-SJ6BR7JMZY",
//  passwd : 'xccobb',
//  email : 'michalsarl@aol.com',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// console.log('app',app);
const auth = getAuth(app);
// console.log("auth",auth);



// signInWithEmailAndPassword(auth,process.env.APP_EMAIL, process.env.APP_PASSWORD)
 signInWithEmailAndPassword(auth, "michalsarl@aol.com", 'xccobb')
// signInWithEmailAndPassword(auth, firebaseConfig.email, firebaseConfig.passwd)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("logged as : ", user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("code : ", errorCode, "  message ; ", errorMessage);
    return null;
  });

export const db = getFirestore(app);