import * as firebase from "firebase";

const serviceAccount = require("./web-spawn-platform.json");

const app = firebase.initializeApp(serviceAccount);
export const firebaseAuth = app.auth();
