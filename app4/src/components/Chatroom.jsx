import React, { useRef, useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import '../css/Chatroom.css';



export default function Chatroom() {
const dummy = useRef(null);
const messagesRef = collection(firestore, 'messages');
const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(50));


const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
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
});


setFormValue('');
};


return (
<div className="chatroom">
<div className="messages">
{messages?.map(msg => (
<ChatMessage key={msg.id} message={msg} />
))}
<span ref={dummy} />
</div>


<form className="chat-form" onSubmit={sendMessage}>
<input
value={formValue}
onChange={(e) => setFormValue(e.target.value)}
placeholder="Type a message..."
/>
<button type="submit" disabled={!formValue.trim()}>
Send
</button>
</form>
</div>
);
}