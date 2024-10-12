"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState('');

  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const router = useRouter();

    // Clear previous errors
    setError('');

    // Basic validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    
    const formData = {
      email,
      password,
      username,
      fullname,
      phone_number: phoneNumber,
      country,
    };

    console.log('Form data:', formData);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;


   //posting to backend
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Check if the registration was successful
        if (data.message === 'user created successfully') {
            router.push('/login');
        } else {
            setError(data.message || 'Registration failed');
        }
    })
      .catch(error => console.error('Error:', error));
    

    // Clear form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

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
      className="w-full min-h-dvh  py-5 px-6 md:px-0 text-white"
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
      <h4 className="w-full text-center text-lg md:text-2xl my-4 font-bold">
        Create an Account
      </h4>
      <div className="max-w-[500px] min-h-[300px] mx-auto flex flex-col justify-start items-start gap-6">
        <h6>
          {formattedDateInWords} {formattedTime}
        </h6>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium leading-none"
            >
              Username
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Full Name
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Enter Full Name"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Email" className="text-sm font-medium leading-none">
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
              htmlFor="phone number"
              className="text-sm font-medium leading-none"
            >
              Phone Number
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium leading-none"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Enter Passworrd again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm font-medium leading-none"
            >
              Country
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 items-center mt-5 text-body-s">{error}</p>}
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2  hover:bg-slate-700">
            Register
          </button>
        </form>
        <p className="text-sm w-full text-center text-[#05803a]">
          <span> Already have an account?</span>
          <a href="/login">
            <span className="text-white ml-2 font-bold">Sign In</span>
          </a>
        </p>
        <p className="text-xs text-white w-full text-center">
          © Copyright 2024 Morgan Group Coin Investment, All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Page;
