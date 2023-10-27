import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import { io } from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const fetchUsername = async () => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) return storedUsername;
            const response = await fetch('https://random-data-api.com/api/users/random_user');
            const data = await response.json();
            console.log('data', data.username);
            localStorage.setItem('username', data.username);
            return data.username;
        };

        (async () => {
            const username = await fetchUsername();
            const newSocket = io(SERVER_URL, { auth: { serverOffset: 0, username } });
            setSocket(newSocket);

            newSocket.on('chat message', (msg, id, username) => {
                setMessages(prev => [...prev, { msg, id, username }]);
            });

            return () => {
                newSocket.disconnect();
            };
        })();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        if (inputValue && socket) {
            socket.emit('chat message', inputValue);
            setInputValue('');
        }
    };
    useEffect(() => {
        console.log(messages);
    }, [messages]);
    return (
        <section className="bg-white border rounded shadow-md max-w-md mx-auto mt-10 p-4">
            <MessageList messages={messages} />
            <form onSubmit={handleSubmit} className="flex">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Type a message" 
                    className="flex-grow p-2 mr-2 border rounded" 
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
            </form>
        </section>
    );
}

export default Chat;
