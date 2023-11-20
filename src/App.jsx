import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/user', { credentials: 'include' })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }, []);
  console.log(user);
  return (
    <NextUIProvider>
      <div className="w-full">
        <h1 style={{ color: 'white', fontSize: '25px'}}>Hi {user?.username}!</h1>
        <Header />
        <Chat user={user} />
      </div>
    </NextUIProvider>
  );
}

export default App;
