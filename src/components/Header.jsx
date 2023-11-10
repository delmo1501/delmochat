import { Avatar } from "@nextui-org/react";

function Header() {
    return (
        <header className="w-full h-19 bg-blue-500 text-white flex justify-between items-center px-4 p-2 relative">
            <div></div>
            <h1 className="absolute inset-x-0 text-center">Chat App</h1>
            <div className="flex items-center">
                <Avatar
                className="transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer"
                isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                {/* Add more items here */}
            </div>
        </header>
    );
}

export default Header;