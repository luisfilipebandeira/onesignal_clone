import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD3Z6y0ncMaV5v7sZHvdS1KFDMa5Uv_j6U",
  authDomain: "signal-clone-42ffe.firebaseapp.com",
  projectId: "signal-clone-42ffe",
  storageBucket: "signal-clone-42ffe.appspot.com",
  messagingSenderId: "318581550656",
  appId: "1:318581550656:web:71705e6ee8b3a6e53179a5"
};

let app
if(!firebase.apps.length){
  app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }