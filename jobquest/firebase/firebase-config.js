import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOe7TiFlTzxGpCCMosSLEyD5XjKGk83-Q",
    authDomain: "jobquest-d9d5b.firebaseapp.com",
    projectId: "jobquest-d9d5b",
    storageBucket: "jobquest-d9d5b.appspot.com",
    messagingSenderId: "551305935673",
    appId: "1:551305935673:web:4293266f9d463c1fa806e8",
    measurementId: "G-PRQ874C390",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
