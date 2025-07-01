import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <NavLink to="/">
        {({ isActive }) => (
          <Button variant={isActive ? "secondary" : "ghost"}>Home</Button>
        )}
      </NavLink>
      <NavLink to="/wallet">
        {({ isActive }) => (
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className="text-white"
          >
            Wallet
          </Button>
        )}
      </NavLink>
    </div>
  );
};

export default Header;
