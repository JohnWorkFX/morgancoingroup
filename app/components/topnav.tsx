"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LuMenuSquare } from "react-icons/lu";
import DropDownMenu from "./dropdownmenu";
import Sidenav from "./sidenav";

const Topnav = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  const toggleSidenav = () => {
    setIsOpen((prev) => !prev); // Toggle the sidenav state
  };
  return (
    <nav className="bg-black  border-b h-16">
        {isOpen && <Sidenav sidebarToggle={toggleSidenav} sidebarStatus={isOpen} />}
      <div className="container mx-auto md:my-4 my-2 flex md:justify-between md:space-x-0 space-x-5">
        <LuMenuSquare
          className="h-10 w-10 text-white block md:hidden"
          onClick={toggleSidenav}
        />
        
        <div className="text-custom-green hidden md:block">
          <ul className="flex space-x-8 ">
            <li className="flex space-x-2">
              <a href="/">
              <p className="py-2.5">Home</p>
              </a>
              <div className="bg-gray-300 rounded-full h-2 w-2 mt-4 "></div>
            </li>
            <li>
              <DropDownMenu />
            </li>
          </ul>
        </div>
        <div className="flex text-white md:pb-0 pb-1">
          <Image
            src="/images/logo.webp"
            alt=""
            className="py-2.5"
            height={24}
            width={24}
          />
          <p className="py-2.5 mx-2">MorganCoinGroup</p>
        </div>
        <div className="hidden md:block text-custom-green">
          <ul className="flex space-x-8">
            <a href="/login">
            <li className="py-2.5">Login</li>
            </a>
           <a href="/register">
           <li className="py-2.5">Register</li>
           </a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
