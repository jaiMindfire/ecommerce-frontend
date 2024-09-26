import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function NavbarLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavbarLayout;
