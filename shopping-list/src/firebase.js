import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAl3AJUoIjuBdmfpV_zjIcbfrzgA5ENyyg",
  authDomain: "shopping-list-1cd50.firebaseapp.com",
  projectId: "shopping-list-1cd50",
  storageBucket: "shopping-list-1cd50.firebasestorage.app",
  messagingSenderId: "684385999518",
  appId: "1:684385999518:web:9664f1a6b1f55d968fb98f",
  measurementId: "G-XFS7HN0J5M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };