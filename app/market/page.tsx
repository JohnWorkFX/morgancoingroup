'use client'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import FXMarketChart from '../components/FXMarketChart'
import CryptoMarketChart from '../components/CryptoMarketChart'
import MarketSummary from '../components/MarketSummary'
import News from '../components/News'
import DashBoardNav from "../components/DashBoardNav";
import { LuMenuSquare } from "react-icons/lu";

const MarketPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <>
      <DashBoardNav />
      <div className="min-h-screen bg-[#0C0D0F] text-white pt-16">
        <div className="flex flex-col md:flex-row">
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden fixed top-20 left-4 z-40 bg-[#23262F] p-2 rounded-full shadow-lg"
            onClick={() => setShowMobileSidebar(true)}
            aria-label="Open sidebar"
          >
            <LuMenuSquare className="h-8 w-8 text-white" />
          </button>
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
          {/* Mobile Sidebar Overlay */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex">
              <div className="w-64 bg-[#1E2026] h-full shadow-lg animate-slide-in-left">
                <Sidebar isSidebarOpen={true} />
              </div>
              <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
            </div>
          )}
          {/* Main Content Area */}
          <div className={`flex-1 w-full ${isSidebarOpen ? 'md:ml-64' : ''}`}> 
            <div className="p-2 sm:p-4 md:p-6 space-y-8">
              <MarketSummary />
              <CryptoMarketChart />
              <FXMarketChart />
              <News />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MarketPage
