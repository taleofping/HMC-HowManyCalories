import * as firebase from 'firebase';
import 'firebase/auth';

class Auth {
  constructor() {
    /*if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAu-L8L4m1z3YAuUqbY-zMIN2rCzmPhAmc',
        authDomain: 'miniproject-468b7.firebaseapp.com',
        databaseURL: 'https://miniproject-468b7.firebaseio.com',
        projectId: 'miniproject-468b7',
        storageBucket: 'miniproject-468b7.appspot.com',
        messagingSenderId: '244095218009',
        appId: '1:244095218009:web:3e04e5344ad95fe0335c48',
        measurementId: 'G-1V7603DN4M',
      });
    } else {
      console.log('firebase apps already running');
    }*/
  }

  signIn = (email, password, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        reject(error);
      });
  };

  signOut = (success, reject) => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        success(null);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  createUser = (email, password, success, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        success(null);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  resetUser = (email, success, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        success(null);
      })
      .catch(function (error) {
        reject(error);
      });
  };

  listeningCurrentUser = (getSuccess) => {
    firebase.auth().onAuthStateChanged(function (user) {
      getSuccess(user);
    });
  };
}

const auth = new Auth();

export default auth;
