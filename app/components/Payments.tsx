import React from "react";

const Payments = () => {
  return (
    <div className="max-w-7xl mx-auto w-full min-h-[60dvh]">
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="rounded-lg border border-white shadow-lg md:w-1/2 w-full min-h-[400px] text-white">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Recent Payments
            </h3>
            <p className="text-sm">
              View your recent transactions and investment activity.
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Date
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Amount
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Asset
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                    <td className="p-4 align-middle">2024-05-12</td>
                    <td className="p-4 align-middle">$1,500.00</td>
                    <td className="p-4 align-middle">BTC</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-black bg-white">
                        Completed
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                    <td className="p-4 align-middle">2024-05-10</td>
                    <td className="p-4 align-middle">$500.00</td>
                    <td className="p-4 align-middle">ETH</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-black bg-white">
                        Pending
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                    <td className="p-4 align-middle">2024-05-05</td>
                    <td className="p-4 align-middle">$800.00</td>
                    <td className="p-4 align-middle">USDC</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-black bg-white">
                        Completed
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-slate-600 data-[state=selected]:bg-slate-300">
                    <td className="p-4 align-middle">2024-04-28</td>
                    <td className="p-4 align-middle">$300.00</td>
                    <td className="p-4 align-middle">BTC</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors text-black bg-white">
                        Completed
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white shadow-lg md:w-1/2 w-full min-h-[400px] text-white">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Payment Methods
            </h3>
            <p className="text-sm">
              Manage your connected wallets and payment options.
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-custom-green rounded-full p-2 text-black">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-medium">Coinbase Wallet</h1>
                    <p>0x123...456</p>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center text-sm font-medium bg-white rounded-md text-black h-9 px-3 hover:bg-slate-300">
                    Verified
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-custom-green rounded-full p-2 text-black">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-medium">MetaMask</h1>
                    <p>0x789...012</p>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center text-sm font-medium bg-white rounded-md text-black h-9 px-3 hover:bg-slate-300">
                    Verified
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-custom-green rounded-full p-2 text-black">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                      <line x1="2" x2="22" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-medium">Visa Card</h1>
                    <p>**** **** **** 4321</p>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center text-sm font-medium bg-white rounded-md text-black h-9 px-3 hover:bg-slate-300">
                    Verified
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-custom-green rounded-full p-2 text-black">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                      <circle cx="12" cy="12" r="2"></circle>
                      <path d="M6 12h.01M18 12h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="font-medium">Bank Account</h1>
                    <p>**** **** 1234</p>
                  </div>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center text-sm font-medium bg-white rounded-md text-black h-9 px-3 hover:bg-slate-300">
                    Verified
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
