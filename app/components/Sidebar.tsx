import React from "react";
import { Home, Wallet as WalletIcon, TrendingUp, History } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => (
  <div
    className={`fixed left-0 top-16 bottom-0 w-64 bg-[#1E2026] border-r border-gray-800 ${
      isSidebarOpen ? "" : "hidden"
    }`}
  >
    <div className="p-4">
      <div className="space-y-2">
        <a href="/dashboard" className="inline">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-md">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
        </a>
        <a href="/wallet" className="block">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-md">
            <WalletIcon className="h-5 w-5" />
            <span>Wallet</span>
          </button>
        </a>
        <a href="/market" className="block">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-md">
            <TrendingUp className="h-5 w-5" />
            <span>Markets</span>
          </button>
        </a>
        <a href="/history" className="block">
          <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-800 rounded-md">
            <History className="h-5 w-5" />
            <span>History</span>
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default Sidebar;
