// firebaseConfig.js

import firebase from 'firebase/app';
import 'firebase/storage'; // Import additional Firebase services as needed

// Initialize Firebase without API key
const firebaseConfig = {
  // Add your other Firebase project configuration parameters here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
