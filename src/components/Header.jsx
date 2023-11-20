import React, { useState } from 'react';
import { Avatar } from "@nextui-org/react";
import CustomButton from './reusable/CustomButton';

function Header() {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google'; // Redirect to /auth/google on backend server
    }
    return (
        <>
            <header style={{ backgroundColor: '#012C5F' }} className="w-full h-19 color-purple flex justify-between items-center px-4 p-2 relative">
                <div></div>
                <h1 className="absolute inset-x-0 text-center text-white">Chat App</h1>
                <div className="flex items-center">
                    <Avatar
                        className="transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
                        isBordered 
                        color="primary" 
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d" 
                        onClick={() => setIsContentVisible(!isContentVisible)}
                    />
                    {/* Add more items here */}
                </div>
            </header>
            {isContentVisible && (
                <div style={{ backgroundColor: '#012C5F' }} className={`absolute right-0 w-40 p-4 transition-all duration-500 ${isContentVisible ? 'opacity-100' : 'opacity-0'}`}>
                <ul className="flex flex-col items-end space-y-4">
                <li><CustomButton variant='light' className="button-width" color="white">Profile</CustomButton></li>
                <li><CustomButton variant='light' className="button-width" color="white">Configuration</CustomButton></li>
                <li><CustomButton variant='light' className="button-width" color="white">Messages</CustomButton></li>
                </ul>
                <button onClick={handleLogin}>Log in with Google</button>
            </div>
            )}
        </>
    );
}

export default Header;