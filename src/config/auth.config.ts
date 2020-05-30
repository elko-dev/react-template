import firebase from 'firebase/app';

require('firebase/auth');

const app = firebase.initializeApp(
  require('../config/web-spawn-platform.json')
);

export const firebaseAuth = app.auth();
