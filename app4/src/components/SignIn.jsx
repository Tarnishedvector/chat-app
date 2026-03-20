
import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div className="sign-in-container">
      <button className="btn-primary" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p className="guidelines">Please follow the community guidelines.</p>
    </div>
  );
}

