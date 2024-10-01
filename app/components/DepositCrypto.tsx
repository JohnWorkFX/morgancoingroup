"use client";
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DepositCrypto = () => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [buttonText, setButtonText] = useState("Copy");

  const copyText = () => {
    if (textRef.current) {
      const textToCopy = textRef.current.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setButtonText("Copied!");
          // Reset the button text after 2 seconds
          setTimeout(() => setButtonText("Copy"), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-custom-green text-black py-2 px-4 text-xs rounded-md">
            Buy Crypto
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[435px] md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Make an Investment</DialogTitle>
            <DialogDescription>
              Fill out the form and follow instructions for your payment to be
              verified.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4  py-2">
            <div className="space-y-2 ">
              <label htmlFor="email" className="text-sm font-medium leading-none text-left flex justify-start ">
                Amount to pay ($)
              </label>
              <input type="number" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0" placeholder="Enter Amount"/>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Wallet Address you&apos;re paying from
              </label>
              <input type="text" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0" placeholder="Enter Wallet Address"/>
            </div>
            <div className="">
              <h3 className="font-bold text-sm">
                Send BTC to the wallet address below:
              </h3>
              <div className="md:flex gap-2 items-center space-y-2 md:space-y-0">
              <p
                ref={textRef}
                className="text-sm text-center justify-end items-end"
              >
                bc1quqlnl7ghnyvmq7nf3ewqa3kvch0fahavp2ww3a
              </p>
              <button
              type="button"
                onClick={copyText}
                className="h-10 px-5 py-2 bg-custom-green text-black rounded font-medium text-sm"
              >
                {buttonText}
              </button>
              </div>
            </div>
            <div className="">
                <h3 className="text-sm font-bold">After making payment, click the PAID button.</h3>
                
            </div>
          </form>
          <div className="flex justify-end space-x-4">
            <button type="submit" className="h-10 px-5 py-2 bg-black text-white rounded font-medium text-sm">Paid</button>
            <DialogClose asChild>
            <button type="button" className="h-10 px-5 py-2 bg-white text-black rounded font-medium text-sm border border-black">Close</button>
          </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepositCrypto;
