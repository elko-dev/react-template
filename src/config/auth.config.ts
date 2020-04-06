import * as firebase from "firebase/app";

const serviceAccount = require("./web-spawn-platform.json");

const app = firebase.initializeApp(serviceAccount);
export const firebaseAuth = app.auth();
