import firebase from 'firebase';
// import database from 'firebase/compat/database';

firebase.initializeApp({
  apiKey: 'AIzaSyAq4u8-EUB6k24eMMXSLh01X4YwW7mbA1w',
  authDomain: 'web-mobile-alisan.firebaseapp.com',
  databaseURL: 'https://web-mobile-alisan-default-rtdb.firebaseio.com',
  projectId: 'web-mobile-alisan',
  storageBucket: 'web-mobile-alisan.appspot.com',
  messagingSenderId: '870935349330',
  appId: '1:870935349330:web:c2f2c9caf04f7ca4abf78b',
});

const Firebase = firebase;

export default Firebase;
