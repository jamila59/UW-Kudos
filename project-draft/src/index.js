import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/App';
import SAMPLE_USERS from './data/users.json'; //a sample list of users 
import EXAMPLE_POSTS from './data/posts.json'; //sample list of posts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { UserContextProvider } from "./context/userContext"


const firebaseConfig = {
    apiKey: "AIzaSyDrzq960QNzwFJAkQL8WB0ZHxLBle27zdQ",
    authDomain: "uw-kudos-4c2b4.firebaseapp.com",
    databaseURL: "https://uw-kudos-4c2b4-default-rtdb.firebaseio.com",
    projectId: "uw-kudos-4c2b4",
    storageBucket: "uw-kudos-4c2b4.appspot.com",
    messagingSenderId: "889217602992",
    appId: "1:889217602992:web:fbb0b2e3707e8361c4b275",
    measurementId: "${config.measurementId}"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
ReactDOM.render( <UserContextProvider> <App users={SAMPLE_USERS} posts={EXAMPLE_POSTS} /> </UserContextProvider>, document.getElementById('root'));
