import React from "react";
import DashBoardNav from "../components/DashBoardNav";
import BitCoinChart from "../components/BitCoinChart";
import DepositCrypto from "../components/DepositCrypto";

const Page = () => {
  return (
    <div>
      <DashBoardNav />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 text-white">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Wallet</h3>
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
                className="lucide lucide-dollar-sign h-4 w-4 text-white"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="p-6 pt-0 flex w-full justify-between">
              <h3 className="text-2xl font-bold">$0</h3>
              <button className="text-custom-green border border-custom-green py-2 px-4 text-xs rounded-md">Withdraw</button>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Investments</h3>
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
                className="lucide lucide-users h-4 w-4 text-white"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <h3 className="text-2xl font-bold">$0</h3>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">ROI</h3>
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
                className="lucide lucide-activity h-4 w-4 text-white"
              >
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <h3 className="text-2xl font-bold">$0</h3>
            </div>
          </div>
          <div className="rounded-lg border shadow-sm w-full ">
            <div className="flex flex-grow p-6 items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">INVEST NOW</h3>
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
                className="lucide lucide-credit-card h-4 w-4 text-white"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
            </div>
            <div className="p-6 pt-0">
              <DepositCrypto/>
            </div>
          </div>
        </div>
        <div className="h-[65dvh] w-full">
          <BitCoinChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
