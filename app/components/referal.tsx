import React from "react";

const Referal = () => {
  return (
    <div className="max-w-7xl mx-auto grid min-h-[70dvh] my-8 lg:grid-cols-2 items-center justify-center gap-8 px-4 md:px-6 lg:gap-16 text-white">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Earn Up to 10% Crypto Rewards with Our Referral Program
        </h2>
        <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
          Invite your friends and family to join our platform and earn bonus
          crypto rewards for every successful referral, up to 10% of their
          investment.
        </p>
        <ul className="grid gap-4">
          <li className="flex items-start gap-4">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-custom-green"
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
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <div>
              <h3 className="md:text-lg font-medium text-white">
              Tiered Referral Rewards
              </h3>
              <p className="text-sm">
              Enjoy higher referral rewards, up to 10%, as you reach higher referral volume tiers.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-custom-green"
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
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <div>
              <h3 className="md:text-lg font-medium text-white">
              10% Exclusive Access
              </h3>
              <p className="text-sm">
              Get 10% exclusive access to premium features and early access to new products.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-custom-green"
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
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <div>
              <h3 className="md:text-lg font-medium text-white">
                10% Bonus Crypto Rewards
              </h3>
              <p className="text-sm">
                Earn up to 10% of your referral's investment as bonus crypto
                rewards.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center">
        <a href="/register" className="w-full flex items-center justify-center">
        <button className="bg-custom-green text-black w-full max-w-[300px] hover:bg-black border border-custom-green hover:text-custom-green py-3 rounded-md">Join Referral Program</button>
        </a>
        <p className="mt-2 text-sm">Start earning up to 10% crypto rewards today!</p>
      </div>
    </div>
  );
};

export default Referal;
