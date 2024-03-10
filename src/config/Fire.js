import firebase from 'firebase';
require("firebase/database");
require("firebase/auth");

const config = {

  apiKey: "AIzaSyC0IlaDTv6nKOEPLAicJIGv6YNe8RtjWxM",
    authDomain: "morgan-900ee.firebaseapp.com",
    databaseURL: "https://morgan-900ee-default-rtdb.firebaseio.com",
    projectId: "morgan-900ee",
    storageBucket: "morgan-900ee.appspot.com",
    messagingSenderId: "215831410803",
    appId: "1:215831410803:web:13e5a25f02ded962839206",
    measurementId: "G-97TV9XM7GW"

};

const fire = firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export const database = firebase.database();


export default fire;