import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDa81GRmSdGsoLZbwcfwQExjZn49MHAwG8",
  authDomain: "birthday-1a1dd.firebaseapp.com",
  projectId: "birthday-1a1dd",
  storageBucket: "birthday-1a1dd.appspot.com",
  messagingSenderId: "192580306481",
  appId: "1:192580306481:web:9c06318f6ef14568eab710",
  measurementId: "G-L5F30Q1G8G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messaging = getMessaging(app);

export const requestNotificationPermission = () => {
  return getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
    if (currentToken) {
      console.log('Token received:', currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.error('An error occurred while retrieving token. ', err);
  });
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

export { auth, analytics, firestore, messaging, getToken, onMessage };
