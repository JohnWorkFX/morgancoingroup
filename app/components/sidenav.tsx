import React from "react";
import { SlHome } from 'react-icons/sl';
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { SlBubble } from 'react-icons/sl';
import { IoLogoBitcoin } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { RiUserAddLine } from "react-icons/ri";

import { IoIosClose } from "react-icons/io";
import { PiHandCoins } from "react-icons/pi";

interface SidenavProps {
    sidebarStatus: boolean;
    sidebarToggle: () => void; // Toggle function
  }

const Sidenav: React.FC<SidenavProps> = ({ sidebarToggle, sidebarStatus }) => {
   
  return (
    <aside  className={`${!sidebarStatus ? '-translate-x-full':''} fixed md:hidden block  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform delay-500 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} >
     <IoIosClose className="absolute text-gray-500 w-8 h-8 top-2 right-4" onClick={sidebarToggle}/>
    <div className="h-full px-3 pb-4 overflow-y-auto flex-col justify-center bg-white dark:bg-gray-800 ">
   
       <ul className="space-y-2 font-medium">
          <li>
             <a href="/dashboard/" className="flex items-center py-5  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SlHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="ms-3">Home</span>
             </a>
          </li>
          <li>
             <a href="/investments/" className="flex items-center py-6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <PiHandCoins className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Investments</span>
                
             </a>
          </li>
          <li>
             <a href="/faq" className="flex items-center py-6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SlBubble className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">FAQ&apos;s</span>
                
             </a>
          </li>
          <li>
             <a href="/contact" className="flex items-center py-6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <TfiHeadphoneAlt  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Contact</span>
             </a>
          </li>
          <li>
             <a href="/" className="flex items-center py-6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <IoLogoBitcoin  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">How To Buy Crypto</span>
             </a>
          </li>
          <hr className='py-2'/>
          <li>
             <a href="/login" className="flex items-center p-2 py-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LuLogIn  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
               
             </a>
          </li>
          <li>
             <a href="/register" className="flex items-center p-2 py-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <RiUserAddLine  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Register</span>
             </a>
          </li>
       </ul>
    </div>
 </aside>
  );
};

export default Sidenav;
