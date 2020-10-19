import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBTdmYHtu9q1m-heSRK91cuy4b7ZK73cvs",
  authDomain: "proton-vip-demo.firebaseapp.com",
  databaseURL: "https://proton-vip-demo.firebaseio.com",
  projectId: "proton-vip-demo",
  storageBucket: "proton-vip-demo.appspot.com",
  messagingSenderId: "912829614960",
  appId: "1:912829614960:web:bfa2b2bef798bd963e1db5",
  measurementId: "G-9YKHBL9FYY"
};
firebase.initializeApp(config);
export default firebase.firestore();
