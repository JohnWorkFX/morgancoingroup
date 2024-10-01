"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuMenuSquare } from "react-icons/lu";
import DashBoardSideNav from "./DashBoardSideNav";
import { GrTransaction } from "react-icons/gr";

const DashBoardNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen((prev) => !prev); // Toggle the sidenav state
  };
  return (
    <div className="flex h-16 sticky text-white border-b px-4 md:px-6">
      <nav className="flex justify-between w-full">
        {isOpen && (
          <DashBoardSideNav
            sidebarToggle={toggleSidenav}
            sidebarStatus={isOpen}
          />
        )}
        <div className="flex items-center gap-2 text-lg font-medium  md:text-sm">
          <LuMenuSquare
            className="h-10 w-10 text-white block md:hidden"
            onClick={toggleSidenav}
          />
          <div className="flex items-center md:border gap-2 border-custom-green text-custom-green py-2 px-3 m-3 rounded-md cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-package2 h-6 w-6 hidden md:block"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
              <path d="M12 3v6"></path>
            </svg>
            <a className="hidden md:block">DashBoard</a>
          </div>
          <div className="flex items-center md:border py-2 gap-2 border-custom-green text-custom-green px-3 m-3 rounded-md cursor-pointer ">
          <GrTransaction className="h-6 w-6 hidden md:block" />
            <a className="hidden md:block ">Transactions</a>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p>Hello John Doe</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-white text-black rounded-full inline-flex justify-center h-10 w-10 items-center font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-circle-user h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="10" r="3"></circle>
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default DashBoardNav;
