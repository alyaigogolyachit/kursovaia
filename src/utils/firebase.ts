// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "cursovayabased.firebaseapp.com",
  projectId: "cursovayabased",
  storageBucket: "cursovayabased.appspot.com",
  messagingSenderId: "489518500729",
  appId: "1:489518500729:web:90a9a627a48c96cc2afda8",
  measurementId: "G-100HQQ1P3K",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
