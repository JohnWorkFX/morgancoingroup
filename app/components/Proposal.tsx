import React from "react";

const Proposal = () => {
  return (
    <div className=" px-4">
      <div className="max-w-7xl w-full min-h-dvh mx-auto text-white gap-6  flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Investment Proposals
        </h1>
        <p className="mb-8 text-center text-[16px]">
          We are a thesis-driven investment firm that invests in
          cryptocurrencies, tokens, and blockchain projects. Morgan Group
          Investment employees ensure that every investor in our community is
          well-informed and secure.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="w-full border border-white p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold mb-2">35%</h3>
            <p className="mb-4">SILVER PLAN</p>
            <p className="font-semibold">DEPOSIT</p>
            <p className="mb-4">$1000 - $4999</p>
          </div>
          <div className="w-full bg-gradient-to-r from-custom-green border border-white p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold mb-2">45%</h3>
            <p className="mb-4">GOLD PLAN</p>
            <p className="font-semibold">DEPOSIT</p>
            <p className="mb-4">$5000 - $15000</p>
          </div>
          <div className="w-full border border-white p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold mb-2">45%</h3>
            <p className="mb-4">DIAMOND PLAN</p>
            <p className="font-semibold">DEPOSIT</p>
            <p className="mb-4">$15000 - $50000</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="w-full border border-white p-6 rounded-lg text-center">
                <h3 className="text-lg font-bold mb-2 text-custom-green">GENERAL COMMISSIONS</h3>
                <p>These commissions are charged by Morgan Group Investment for the platform to work. They are not related to the profit received by our investors.</p>
            </div>
            <div className="w-full border border-white p-6 rounded-lg text-center space-y-4">
                <p className="font-semibold">COMPANY COMMISSION</p>
                <p className="text-custom-green">0.5% from the received profit by the robot. This commission shows the earnings of the entire Morgan Group Investment structure, namely, each employee.</p>
                <p className="font-semibold">ADMINISTRATIVE COMMISSION</p>
                <p className="text-custom-green">0.5% for technical support of the robot and the company as a whole. This commission includes the development and marketing costs of the company.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
