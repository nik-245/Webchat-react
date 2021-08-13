import firebase from  'firebase/app';
import 'firebase/auth';

export const auth  = firebase.initializeApp( {
    apiKey: "AIzaSyD0GpIwB2UtUdf4A7mBf7UQrGaILNWtaUM",
    authDomain: "webchat-1c504.firebaseapp.com",
    projectId: "webchat-1c504",
    storageBucket: "webchat-1c504.appspot.com",
    messagingSenderId: "86018174044",
    appId: "1:86018174044:web:270b180e4485b052df0a99"
  }).auth();