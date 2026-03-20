import React from 'react';
import { auth } from '../firebase';

export default function ChatMessage({ message }) {
  const { text, uid, displayName } = message;
  const isSent = uid === auth.currentUser?.uid;
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'A';

  return (
    <div className={`message ${isSent ? 'sent' : 'received'}`}>
      <div className="avatar">{initial}</div>
      <div className="message-content">
        <span className="message-meta">{isSent ? 'You' : displayName}</span>
        <div className="message-bubble">{text}</div>
      </div>
    </div>
  );
}
