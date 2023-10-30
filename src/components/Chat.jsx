import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import { io } from 'socket.io-client';

const SERVER_URL = "http://localhost:3000";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [socket, setSocket] = useState(null);  
    
    const sessionID = useState(() => {
        let sID = sessionStorage.getItem('sessionID');
        if (!sID) {
            sID = Math.random().toString(36).substr(2, 9); // generate a random string
            sessionStorage.setItem('sessionID', sID);
        }
        return sID;
    })[0];

    // useEffect(() => {
    //     const fetchUsername = async () => {
    //         const storedUsername = sessionStorage.getItem('username');
    //         if (storedUsername) return storedUsername;
    //         const response = await fetch('https://random-data-api.com/api/users/random_user');
    //         const data = await response.json();
    //         console.log('data', data.username);
    //         sessionStorage.setItem('username', data.username);
    //         return data.username;
    //     };

    //     (async () => {
    //         const username = await fetchUsername();
    //         const newSocket = io(SERVER_URL, { auth: { serverOffset: 0, username, sessionID } });
    //         setSocket(newSocket);

    //         newSocket.on('chat message', (msg, id, username) => {
    //             console.log('Received message from backend:', msg, id, username);
    //             setMessages(prev => [...prev, { msg, id, username }]);
    //         });

    //         return () => {
    //             newSocket.disconnect();
    //         };
    //     })();
    // }, []);
    useEffect(() => {
        // Check if the socket is already initialized
        if (!socket) {
            // Function to fetch the username
            const fetchUsername = async () => {
                // Check if a username is stored in sessionStorage
                const storedUsername = sessionStorage.getItem('username');
                if (storedUsername) {
                    return storedUsername;
                }
                // If no username is stored, fetch a random username
                const response = await fetch('https://random-data-api.com/api/users/random_user');
                const data = await response.json();
                const randomUsername = data.username;
    
                // Store the fetched username in sessionStorage
                sessionStorage.setItem('username', randomUsername);
    
                return randomUsername;
            };
    
            // Inside an async function, fetch the username
            (async () => {
                const username = await fetchUsername();
                
                // Create a new socket with the username and session ID
                const newSocket = io(SERVER_URL, {
                    auth: { serverOffset: 0, username, sessionID },
                });
                
                // Set the new socket in the component state
                setSocket(newSocket);
    
                // Register an event listener for chat messages
                newSocket.on('chat message', (msg, id, username) => {
                    console.log('Received message from backend:', msg, id, username);
                    setMessages(prev => [...prev, { msg, id, username }]);
                });
    
                // Return a cleanup function to disconnect the socket when the component unmounts
                return () => {
                    newSocket.disconnect();
                };
            })();
        }
    }, [socket, sessionID]);
    

    const handleSubmit = e => {
        e.preventDefault();

        if (inputValue && socket) {
            socket.emit('chat message', inputValue);
            
            // // Add the sent message to the local state
            // const username = localStorage.getItem('username') || 'anonymous';
            // setMessages(prev => [...prev, { msg: inputValue, id: new Date().toISOString(), username }]);
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
