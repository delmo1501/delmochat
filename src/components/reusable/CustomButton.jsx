import React from 'react';
import { Button } from "@nextui-org/react";
import '../../App.css';

function CustomButton({ children, onClick }) {
  return (
    <Button className="custom-button" color="primery" onClick={onClick}>
      {children}
    </Button>
  );
}

export default CustomButton;