"use client";
import React, { useState } from "react";
import DashBoardNav from "../components/DashBoardNav";

const KYCPage = () => {
  const [status, setStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted');
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    address: '',
    idFile: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'idFile' && files) {
      setForm({ ...form, idFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setStatus('pending');
      setSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <DashBoardNav />
      <div className="min-h-screen bg-[#0C0D0F] text-white pt-16 flex flex-col items-center">
        <div className="w-full max-w-lg bg-[#1E2026] rounded-xl shadow p-6 mt-10">
          <h2 className="text-2xl font-bold mb-2">KYC Verification</h2>
          <p className="text-gray-400 mb-6">Complete your KYC to unlock all features. Please provide accurate information and upload a valid government-issued ID.</p>

          {/* Status Indicator */}
          <div className="mb-6">
            {status === 'not_submitted' && <span className="px-3 py-1 rounded bg-gray-700 text-gray-300 text-xs">Not Submitted</span>}
            {status === 'pending' && <span className="px-3 py-1 rounded bg-yellow-600 text-yellow-100 text-xs">Pending Review</span>}
            {status === 'approved' && <span className="px-3 py-1 rounded bg-green-600 text-green-100 text-xs">Approved</span>}
            {status === 'rejected' && <span className="px-3 py-1 rounded bg-red-600 text-red-100 text-xs">Rejected</span>}
          </div>

          {/* KYC Form */}
          {status === 'not_submitted' && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Upload ID (Passport, Driver&apos;s License, etc.)</label>
                <input
                  type="file"
                  name="idFile"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                  required
                  className="w-full rounded bg-[#23262F] border border-gray-700 px-3 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition"
              >
                {submitting ? 'Submitting...' : 'Submit KYC'}
              </button>
            </form>
          )}

          {status === 'pending' && (
            <div className="text-yellow-200 text-center py-8">
              <p>Your KYC submission is under review. You will be notified once it is processed.</p>
            </div>
          )}
          {status === 'approved' && (
            <div className="text-green-300 text-center py-8">
              <p>Your KYC has been approved! Thank you.</p>
            </div>
          )}
          {status === 'rejected' && (
            <div className="text-red-300 text-center py-8">
              <p>Your KYC was rejected. Please check your information and try again.</p>
              <button
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition"
                onClick={() => setStatus('not_submitted')}
              >
                Resubmit KYC
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KYCPage; 