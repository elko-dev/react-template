import firebase from 'firebase/app';

import * as _webServiceAccountConfig from '../config/web-spawn-platform.json';
require('firebase/auth');

const app = firebase.initializeApp(require('../config/web-spawn-platform.json'));

export const firebaseAuth = app.auth();
