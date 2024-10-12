"use client";
import React, { useState } from "react";
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
const WithdrawCrypto = () => {
  const { data: session } = useSession();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const description = "Withdrawal to my wallet";

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
      description: description,
    };

    console.log("Form data:", formData);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/transact/withdraw`;

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

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button
            className="text-custom-green border border-custom-green py-2 px-4 text-xs rounded-md"
            onClick={() => setIsDialogOpen(true)}
          >
            Withdraw
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[435px] md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Withdraw Your Funds</DialogTitle>
            <DialogDescription>
              Fill out the form and follow instructions for your withdrawal to
              be completed.
            </DialogDescription>
          </DialogHeader>
          {isSubmitted ? ( // Conditional rendering for success GIF
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">
                Your transaction has been submitted successfully.
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
            <form onSubmit={handleSubmit} className="space-y-4  py-2">
              <div className="space-y-2 ">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-left flex justify-start "
                >
                  Amount to withdraw ($)
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
                  htmlFor="email"
                  className="text-sm font-medium leading-none"
                >
                  Wallet Address you&apos;re paying to
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
                  placeholder="Enter Wallet Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="h-10 px-5 py-2 bg-black text-white rounded font-medium text-sm"
                >
                  Withdraw
                </button>
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
            <h1 className="text-center ">Need other forms of Payments?</h1>
            <p className="text-center text-sm text-[#108f81]">
              <a href="">Contact costumer care</a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawCrypto;
