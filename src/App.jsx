import React from 'react';
import Chat from './components/Chat';
import Header from './components/Header';
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="w-full">
        <Header />
        <Chat />
      </div>
    </NextUIProvider>
  );
}

export default App;
