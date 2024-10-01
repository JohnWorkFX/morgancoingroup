'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
const page = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(timerId); // Cleanup on component unmount
      }, []);

      const formatDateToWords = (date: Date): string => {
        const day = date.getDate();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = dayNames[date.getDay()]; // Get day of the week
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
    
        // Convert day to ordinal (1st, 2nd, 3rd, etc.)
        const ordinalSuffix = (day: number): string => {
          if (day > 3 && day < 21) return 'th'; // Special case for 11-20
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
    
        return `${dayOfWeek} ${day}${ordinalSuffix(day)} of ${month}  ${year}`;
      };
      const formattedTime = currentTime.toLocaleTimeString();
      const formattedDateInWords = formatDateToWords(currentTime);
  return (
    <div className="w-full min-h-dvh  py-10 px-6 md:px-0 text-white" style={{ backgroundImage: `url('/images/auth-bg.jpeg')` }}>
      <h2 className='w-full text-center text-lg md:text-2xl flex flex-col md:flex-row justify-center items-center gap-4'>
      <Image
            src="/images/logo.webp"
            alt=""
            className="py-2.5"
            height={40}
            width={40}
          />
          Morgan Group Coin Investment
      </h2>
      <h4 className='w-full text-center text-lg md:text-2xl my-4 md:my-8 font-bold'>User Login</h4>
      <div className='max-w-[500px] min-h-[300px] mx-auto flex flex-col justify-start items-start gap-6'>
        <h6>{formattedDateInWords} {formattedTime}</h6>
        <form action="" className='grid gap-4 py-4 w-full'>
            <div className='space-y-2'>
                <label htmlFor="email" className='text-sm font-medium leading-none'>Email</label>
                <input type="email" className='flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0' placeholder='Email'/>
            </div>
            <div className='space-y-2'>
                <label htmlFor="password" className='text-sm font-medium leading-none'>Password</label>
                <input type="password" className='flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0' placeholder='Password'/>
            </div>
            <button className='inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2  hover:bg-slate-700'>Sign In</button>
        </form>
        <p className='text-sm w-full text-center text-[#05803a]'>
            <span> Don't have an account?</span>
           <a href="/register">
           <span className='text-white ml-2 font-bold'>Sign Up</span>
           </a>
        </p>
        <p className='text-xs text-white w-full text-center'>© Copyright 2024 Morgan Group Coin Investment, All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default page
