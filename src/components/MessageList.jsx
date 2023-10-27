import React from 'react';

function MessageList({ messages }) {
    return (
        <ul className="overflow-y-scroll h-96 mb-4">
            {messages.map((message, index) => (
                <li key={index} className={index % 2 === 0 ? "bg-af8484" : "bg-af8484"}>
                    <p>{message.msg}</p>
                    <small>{message.username}</small>
                </li>
            ))}
        </ul>
    );
}

export default MessageList;
