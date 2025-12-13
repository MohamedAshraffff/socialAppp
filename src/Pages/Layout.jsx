import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
// import Footer from '../components/Footer'
import { mode } from "../Context/theme.context";
export default function Layout() {
  const { theme } = useContext(mode);

  return (
    <div
      className={`${
        theme === "dark" && "dark"
      } dark:text-white dark:bg-black flex min-h-screen flex-col justify-between items-center overflow-x-hidden w-full`}
    >
      <Navbar />
      <div className="container w-full px-2 sm:px-4 max-w-full">
        <Outlet />
      </div>
    </div>
  );
}
