import firebase from 'firebase';

const firestore = firebase.firestore();

export const users = firestore.collection('users');
export const messages = firestore.collection('messages');