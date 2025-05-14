"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

// Create a client component that uses useSearchParams
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams ? searchParams.get('verified') : null;

  useEffect(() => {
    if (verified === 'true') {
      setErr('Email verified successfully! You can now log in.');
    }
  }, [verified]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      if (result?.error) {
        if (result.error.includes('verify')) {
          setErr('Please verify your email first');
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        setErr(result.error);
      } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          throw new Error("Login failed");
        }
        const data = await response.json();
        if (data.redirect_to_admin) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
  
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErr('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  

  const handleResendVerification = async () => {
    setLoading(true);
    setErr('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setErr(data.message || 'Failed to send verification email');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErr('An error occurred while sending verification email');
    } finally {
      setLoading(false);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, []);

  const formatDateToWords = (date: Date): string => {
    const day = date.getDate();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayNames[date.getDay()]; // Get day of the week
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Convert day to ordinal (1st, 2nd, 3rd, etc.)
    const ordinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th"; // Special case for 11-20
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayOfWeek} ${day}${ordinalSuffix(day)} of ${month}  ${year}`;
  };
  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDateInWords = formatDateToWords(currentTime);
  return (
    <div
      className="w-full min-h-dvh  py-10 px-6 md:px-0 text-white"
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
      <h4 className="w-full text-center text-lg md:text-2xl my-4 md:my-8 font-bold">
        User Login
      </h4>
      <div className="max-w-[500px] min-h-[300px] mx-auto flex flex-col justify-start items-start gap-6">
        <h6>
          {formattedDateInWords} {formattedTime}
        </h6>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              type="email"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            <input
              type="password"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && (
            <div className="text-center">
              <p className={`${err.includes('verified successfully') ? 'text-green-500' : 'text-red-500'} mt-2`}>
                {err}
              </p>
              {err.includes('verify') && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-green-500 hover:underline mt-2"
                  disabled={loading}
                >
                  Resend verification email
                </button>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2 hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
        <p className="text-sm w-full text-center text-[#05803a]">
          <span> Don&apos;t have an account?</span>
          <a href="/register">
            <span className="text-white ml-2 font-bold">Sign Up</span>
          </a>
        </p>
        <p className="text-xs text-white w-full text-center">
          © Copyright 2024 Morgan Group Coin Investment, All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

// Main page component with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
