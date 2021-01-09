import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAin22yOiH6XYnUNCU2AqHNtxYxYWhBDoo",
    authDomain: "ellochat-8d427.firebaseapp.com",
    databaseURL: "https://ellochat-8d427-default-rtdb.firebaseio.com",
    projectId: "ellochat-8d427",
    storageBucket: "ellochat-8d427.appspot.com",
    messagingSenderId: "801659487038",
    appId: "1:801659487038:web:0d47db9fce035a2984226f",
    measurementId: "G-7L77WJVP2K"
};

export default firebase.initializeApp(firebaseConfig);