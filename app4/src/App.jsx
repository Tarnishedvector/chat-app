import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Chatroom from './components/Chatroom';
import './App.css';

export default function App() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState('public');
  const [isPrivateUnlocked, setIsPrivateUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_PRIVATE_ROOM_PASSWORD) {
      setIsPrivateUnlocked(true);
      setPasswordInput('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
    if (room === 'public') {
      setIsPrivateUnlocked(false);
      setPasswordInput('');
    }
  };

  return (
    <div className="app-root">
      <div className="app-card">
        <header className="app-header">
          <h1>⚛️🔥💬 ChatApp</h1>
          {user && <SignOut />}
        </header>

        <main className="app-main">
          {user ? (
            <div className="main-content">
              <div className="room-selector">
                <button 
                  className={`room-btn ${currentRoom === 'public' ? 'active' : ''}`}
                  onClick={() => handleRoomChange('public')}
                >
                  Public Room
                </button>
                <button 
                  className={`room-btn ${currentRoom === 'private' ? 'active' : ''}`}
                  onClick={() => handleRoomChange('private')}
                >
                  Private Room
                </button>
              </div>

              {currentRoom === 'private' && !isPrivateUnlocked ? (
                <div className="password-prompt">
                  <h2>Private Room</h2>
                  <p>Please enter the password to join.</p>
                  <form onSubmit={handlePasswordSubmit} className="password-form">
                    <input 
                      type="password" 
                      value={passwordInput} 
                      onChange={(e) => setPasswordInput(e.target.value)} 
                      placeholder="Enter password"
                    />
                    <button type="submit" className="btn-primary">Unlock</button>
                  </form>
                </div>
              ) : (
                <Chatroom room={currentRoom} />
              )}
            </div>
          ) : (
            <SignIn />
          )}
        </main>

        <footer className="app-footer">
        </footer>
      </div>
    </div>
  );
}
