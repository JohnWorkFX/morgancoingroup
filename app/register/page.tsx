"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`,
          fullname: `${formData.firstName} ${formData.lastName}`,
          phone_number: formData.phone,
          country: "US",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to email verification page
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        setErr(data.message || "Registration failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErr("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <h4 className="w-full text-center text-lg md:text-2xl my-4 md:my-8 font-bold">
        Create Account
      </h4>
      <div className="max-w-[500px] min-h-[300px] mx-auto flex flex-col justify-start items-start gap-6">
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium leading-none">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium leading-none">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-0"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {err && <p className="text-red-500 mt-2 text-center">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#05803a] h-10 px-4 py-2 hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </form>
        <p className="text-sm w-full text-center text-[#05803a]">
          <span>Already have an account? </span>
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
