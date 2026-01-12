import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function SignOut() {
  return auth.currentUser && (
    <button className="sign-out-btn" onClick={() => signOut(auth)}>
      Sign Out
    </button>
  );
}
