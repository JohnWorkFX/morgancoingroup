"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
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

  const { data: session } = useSession();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const plan = "Gold";
  const description = "Investment in Gold plan";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Basic validation
    if (amount == 0) {
      setError("Please enter an amount");
      return;
    }

    const formData = {
      wallet_address: address,
      amount: amount,
      plan: plan,
      description: description,
    };

    console.log("Form data:", formData);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/transact/invest`;

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // setIsDialogOpen(false);
        setIsSubmitted(true);
        setAmount(0);
        setAddress("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to submit the request. Please try again later.");
      });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsSubmitted(false); // Reset submission status when dialog closes
  };

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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="bg-custom-green text-black py-2 px-4 text-xs rounded-md"
            onClick={() => setIsDialogOpen(true)}
          >
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
          {isSubmitted ? ( // Conditional rendering for success GIF
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">
                Thank you for your investment!
              </h3>
              <img
                src="/images/successful.gif"
                alt="Success"
                className="mx-auto"
              />
              <p className="mt-2">
                Your transaction has been submitted successfully.
              </p>
              <DialogClose asChild>
                <button
                  type="button"
                  onClick={handleDialogClose}
                  className="h-10 px-5 py-2 mt-3 bg-black text-custom-green rounded font-medium text-sm border border-black"
                >
                  Close
                </button>
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium leading-none text-left flex justify-start"
                >
                  Amount to pay ($)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Enter Amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium leading-none"
                >
                  Wallet Address you&apos;re paying from
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Enter Wallet Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">
                  Send BTC to the wallet address below:
                </h3>
                <div className="md:flex gap-2 items-center space-y-2 md:space-y-0">
                  <p
                    ref={textRef}
                    className="text-sm text-center justify-end items-end"
                  >
                    bc1qf687zsvep7ymjvn5kglvzjdl2r0h2ek5w7uvad
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
              <div>
                <h3 className="text-sm font-bold">
                  After making payment, click the PAID button.
                </h3>
              </div>

              <div className="flex justify-end space-x-4">
                {!isSubmitted && (
                  <button
                    type="submit"
                    className="h-10 px-5 py-2 bg-black text-white rounded font-medium text-sm"
                  >
                    Paid
                  </button>
                )}
                <DialogClose asChild>
                  <button
                    type="button"
                    className="h-10 px-5 py-2 bg-white text-black rounded font-medium text-sm border border-black"
                  >
                    Close
                  </button>
                </DialogClose>
              </div>
            </form>
          )}
          {error && (
            <p className="text-red-500 items-center mt-5 text-body-s">
              {error}
            </p>
          )}
          <div>
            <h1 className="text-center">Need other forms of Payments?</h1>
            <p className="text-center text-sm text-[#108f81]">
              <a href="">Contact customer care</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepositCrypto;
