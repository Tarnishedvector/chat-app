import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';


import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Chatroom from './components/Chatroom';
import './App.css';


export default function App() {
const [user] = useAuthState(auth);


return (
<div className="app-root">
<div className="app-card">
<header className="app-header">
<h1>⚛️🔥💬 ChatApp</h1>
{user && <SignOut />}
</header>


<main className="app-main">
{user ? <Chatroom /> : <SignIn />}
</main>


<footer className="app-footer">

</footer>
</div>
</div>
);
}



