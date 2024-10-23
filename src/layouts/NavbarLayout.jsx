//3rd Party Imports
import { Outlet } from "react-router-dom";
//Static Imports
import Navbar from "@components/Navbar/Navbar";

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default NavbarLayout;
