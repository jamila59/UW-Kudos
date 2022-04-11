import { createContext, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../index";
import { getDatabase, ref, set } from 'firebase/database'

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   
  useState(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => { // Adds an observer for changes to the user's sign-in state.
      if (res) {
        setUser(res);
        // writeUserData(res)
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUser = (email, password, name, major) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password) // Creates a new user account  (firebase func)
      .then(() =>
        updateProfile(auth.currentUser, { // Updates a user's profile data. (firebase func)
          displayName: name,
        })
        .then(() =>{
          const db = getDatabase();
          console.log(auth.currentUser)
          set(ref(db, 'users/' + name), {
            username: name,
            email: email,
            major: major,
          });

        })
      )
      .then((res) => console.log(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password) // Asynchronously signs in using an email and password (firebase)
      .then((res) => console.log(res))
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));

  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email); //Sends a password reset email to the given email address. (firebase)
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};