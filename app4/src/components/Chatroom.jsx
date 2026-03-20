import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import '../css/Chatroom.css';



export default function Chatroom({ room }) {
const dummy = useRef(null);
const messagesRef = collection(firestore, 'messages');
const messagesQuery = query(
  messagesRef, 
  where('room', '==', room || 'public'), 
  orderBy('createdAt'), 
  limit(50)
);


const [rawMessages, loading, error] = useCollectionData(messagesQuery, { idField: 'id' });

if (error) {
  console.error("Firebase Query Error:", error);
}

// Filter out messages older than 24 hours locally just in case TTL deletion is delayed
const messages = rawMessages?.filter(msg => {
  if (!msg.createdAt) return true; // Keep optimistic updates
  const messageTime = msg.createdAt.toMillis ? msg.createdAt.toMillis() : msg.createdAt.seconds * 1000;
  return (Date.now() - messageTime) < 24 * 60 * 60 * 1000;
});
const [formValue, setFormValue] = useState('');


useEffect(() => {
dummy.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);


const sendMessage = async (e) => {
e.preventDefault();
if (!formValue.trim()) return;


const { uid, displayName } = auth.currentUser;


await addDoc(messagesRef, {
text: formValue.trim(),
uid,
displayName: displayName || 'Anonymous',
createdAt: serverTimestamp(),
room: room || 'public',
expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
});


setFormValue('');
};


return (
<div className="chatroom">
<div className="messages">
{messages?.map((msg, idx) => (
<ChatMessage key={msg.id || idx} message={msg} />
))}
<span ref={dummy} />
</div>


<form className="chat-form" onSubmit={sendMessage}>
<input
value={formValue}
onChange={(e) => setFormValue(e.target.value)}
placeholder="Type a message..."
/>
<button type="submit" className="btn-primary" disabled={!formValue.trim()}>
Send
</button>
</form>
</div>
);
}