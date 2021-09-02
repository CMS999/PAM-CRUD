import firebase from "firebase/app";
import firestore from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACLqmw1EA6CpCMgyyBDkcja4ISI40gho4",
    authDomain: "pam-crud.firebaseapp.com",
    databaseURL: "https://pam-crud-default-rtdb.firebaseio.com",
    projectId: "pam-crud",
    storageBucket: "pam-crud.appspot.com",
    messagingSenderId: "1037570402210",
    appId: "1:1037570402210:web:6914344454266b9b5f74fb"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;