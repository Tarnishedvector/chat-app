
import React from 'react';
import { auth } from '../firebase';

export default function ChatMessage({ message }) {
  const { text, uid, displayName } = message;
  const isSent = uid === auth.currentUser?.uid;

  return (
    <div className={`message ${isSent ? 'sent' : 'received'}`}>
      <span className="username">{isSent ? 'You' : displayName}</span>
      <p>{text}</p>
    </div>
  );
}
