// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBfw2yel9NFyJLudkXNfSVeCj75dPf0lTc",
    authDomain: "whatsappclone-61240.firebaseapp.com",
    projectId: "whatsappclone-61240",
    storageBucket: "whatsappclone-61240.appspot.com",
    messagingSenderId: "237535859721",
    appId: "1:237535859721:web:d1d50f24b7de05f8efd4d8",
    measurementId: "G-3FGT0SP24E"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = new firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;

