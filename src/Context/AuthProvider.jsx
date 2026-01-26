import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,  signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }
    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }
  const updateUserProfile = async (profile) => {
  if (!auth.currentUser) return;

  await updateProfile(auth.currentUser, profile);

  setUser({
    ...auth.currentUser,
    ...profile
  });
};


   

   useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        setLoading(false);
    })
    return ()=> unsubscribe();
   
   },[])
    const authInfo = {

        user, 
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        googleSignIn,
        signOutUser,
        updateUserProfile,
    }
    return (
        <AuthContext value={authInfo}>
            {children}

        </AuthContext>
    );
};

export default AuthProvider;