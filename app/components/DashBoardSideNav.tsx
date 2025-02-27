import React from "react";
import { SlHome } from 'react-icons/sl';
import { GrTransaction } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";

interface SidenavProps{
    sidebarStatus: boolean;
    sidebarToggle: () => void;
}

const DashBoardSideNav: React.FC<SidenavProps> = ({sidebarStatus, sidebarToggle}) => {

  return (
    <aside  className={`${!sidebarStatus ? '-translate-x-full':''} fixed md:hidden block  top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform delay-500 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} >
     <IoIosClose className="absolute text-gray-500 w-8 h-8 top-2 right-4" onClick={sidebarToggle}/>
    <div className="h-full px-3 pb-4 overflow-y-auto flex-col justify-center bg-white dark:bg-gray-800 ">
   
       <ul className="space-y-2 font-medium">
          <li>
             <a href="/dashboard/" className="flex items-center py-5  p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SlHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="ms-3">Dashboard</span>
             </a>
          </li>
          <li>
             <a href="/transactions/" className="flex items-center py-6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <GrTransaction className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Transactions</span>
                
             </a>
          </li>


         
          
        
       </ul>
    </div>
 </aside>
  )
}

export default DashBoardSideNav
