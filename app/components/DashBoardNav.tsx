"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashBoardNav = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black border-b h-16 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="/dashboard" className="flex items-center">
            <Image src="/images/logo.webp" alt="Logo" height={32} width={32} />
            <span className="ml-2 text-white font-semibold text-lg hidden md:block">MorganCoinGroup</span>
          </a>
        </div>
        {/* Center nav links */}
        <div className="hidden  text-custom-green">
          <ul className="flex space-x-8 text-base font-medium">
            <li>
              <a href="/dashboard" className="py-2.5 hover:text-yellow-400 transition">Dashboard</a>
            </li>
            <li>
              <a href="/market" className="py-2.5 hover:text-yellow-400 transition">Market</a>
            </li>
            <li>
              <a href="/transactions" className="py-2.5 hover:text-yellow-400 transition">History</a>
            </li>
            <li>
              <a href="/wallet" className="py-2.5 hover:text-yellow-400 transition">Wallet</a>
            </li>
          </ul>
        </div>
        {/* User section (keep this as requested) */}
        <div className="flex gap-4 items-center">
          <p className="text-white">Hello, {session?.user.username}</p>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              <DropdownMenuItem>
                <button onClick={() => signOut()}>Log Out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default DashBoardNav;
