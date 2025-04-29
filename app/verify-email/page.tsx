"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get("email") || "";

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email,
            otp_code: otp
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 3000);
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (error) {
      setError("An error occurred during verification")
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVerificationSent(true);
        setError("");
      } else {
        setError(data.message || "Failed to resend verification email");
      }
    } catch (error) {
      setError("An error occurred while resending verification email");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="w-full min-h-dvh py-10 px-6 md:px-0 text-white flex flex-col items-center justify-center" style={{ backgroundImage: `url('/images/auth-bg.jpeg')` }}>
        <h2 className="text-2xl font-bold mb-4">Invalid Request</h2>
        <p className="mb-4">No email address provided.</p>
        <button
          onClick={() => router.push("/register")}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2 hover:bg-slate-700"
        >
          Go to Registration
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-dvh py-10 px-6 md:px-0 text-white"
      style={{ backgroundImage: `url('/images/auth-bg.jpeg')` }}
    >
      <h2 className="w-full text-center text-lg md:text-2xl flex flex-col md:flex-row justify-center items-center gap-4">
        <Image
          src="/images/logo.webp"
          alt=""
          className="py-2.5"
          height={40}
          width={40}
        />
        Morgan Group Coin Investment
      </h2>
      <div className="max-w-[500px] min-h-[300px] mx-auto mt-8 flex flex-col items-center justify-center gap-6">
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="mb-2">
            We&apos;ve sent a verification code to:
          </p>
          <p className="font-semibold mb-4">{email}</p>
          
          {success ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">
                Email verified successfully! Redirecting to login...
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmitOTP} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-sm font-medium mb-2">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#05803a] hover:bg-slate-700 text-white py-3 rounded transition-colors"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
              
              {verificationSent ? (
                <p className="text-green-500 mb-4">
                  New verification code has been sent!
                </p>
              ) : (
                <p className="mb-4">
                  Haven&apos;t received the code?{" "}
                  <button
                    onClick={handleResendVerification}
                    disabled={loading}
                    className="text-[#05803a] hover:underline focus:outline-none"
                  >
                    {loading ? "Sending..." : "Resend verification code"}
                  </button>
                </p>
              )}
            </>
          )}
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2 hover:bg-slate-700"
          >
            Go to Login
          </button>
        </div>
        
        <p className="text-xs text-white w-full text-center mt-8">
          © Copyright 2024 Morgan Group Coin Investment, All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Page; 