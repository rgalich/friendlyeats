import firebase from 'firebase';
import ('firebase/firestore');

const config = {
  apiKey: 'AIzaSyCUGNb7tb8XbEhNIWYYn6LY6k2vtyQkNQA',
  authDomain: 'friendlyeats-98ed4.firebaseapp.com',
  databaseURL: 'https://friendlyeats-98ed4.firebaseio.com',
  projectId: 'friendlyeats-98ed4',
  storageBucket: 'friendlyeats-98ed4.appspot.com',
  messagingSenderId: '438529233970',
};

firebase.initializeApp(config);

const performance = firebase.performance();
performance.trace('test');

const db = firebase.firestore();

const auth = firebase.auth();

const firestore = firebase.firestore;

const firebaseModule = {
    db,
    auth,
    firestore,
    performance,
};

export default firebaseModule;
