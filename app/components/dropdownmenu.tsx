

import React from "react";

const DropDownMenu = () => {


  return (
    <div className="relative group">
      <button className="text-custom-green inline-flex h-10 px-4 hover:bg-slate-500 items-center justify-center rounded-md text-sm font-medium">
        About Us
        <svg
          className="w-2.5 h-2.5 ml-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul className="absolute z-10 hidden grid-cols-2 gap-4 p-4 bg-white shadow-md rounded-md text-black group-hover:grid w-[500px] items-center justify-center ">
        <a href="/investments">
        <li className="p-2 hover:bg-custom-green rounded-md text-center">Investments</li>
        </a>
        <a href="/contact">
        <li className="p-2 hover:bg-custom-green rounded-md text-center">Contact</li>
        </a>
        <a href="/faq">
        <li className="p-2 hover:bg-custom-green rounded-md text-center">FAQ&apos;s</li>
        </a>
        <li className="p-2 hover:bg-custom-green rounded-md text-center">How to Buy Crypto</li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
