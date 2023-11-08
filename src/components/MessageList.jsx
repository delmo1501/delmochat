import React, { useEffect, useRef } from 'react';

function MessageList({ messages }) {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <ul className="overflow-y-scroll h-96 mb-4">
            {messages.map((message, index) => (
                <li key={index} className={index % 2 === 0 ? "bg-af8484" : "bg-af8484"}>
                    <p>{message.msg}</p>
                    <small>{message.username}</small>
                </li>
            ))}
            <li ref={endOfMessagesRef} />
        </ul>
    );
}

export default MessageList;
