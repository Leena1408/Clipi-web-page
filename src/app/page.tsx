"use client";

import { useState } from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "icloud.com",
    "outlook.com",
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) return false;
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(
        "Invalid email. Use @gmail.com, @yahoo.com, @icloud.com, or @outlook.com"
      );
      return;
    }
    setError("");
    try {
      await axios.post("/api/sendToTelegram", { email });
      setSuccess(true);
      setEmail(""); // Clear email field after success
    } catch (err) {
      setError("Failed to send email. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 md:px-8 bg-black md:bg-cover md:bg-center md:bg-no-repeat">
      <style>
        {`
          @media (max-width: 768px) {
            .responsive-bg {
              background-image: none !important;
              background-color: black !important;
            }
          }
        `}
      </style>

      {/* Black Box in Center */}
      <div className="absolute flex justify-center items-center inset-0">
        <div className="w-[90%] md:w-[650px] h-auto md:h-[600px] bg-black bg-opacity-40 rounded-lg p-6"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-lg responsive-bg">
        {/* Horizontal line with flower in center */}
        <div className="flex flex-col items-center w-full my-4">
          <div className="flex items-center justify-center">
            <div className="w-1/4 border-t border-[#FAD791]"></div>
            <div className="w-1/4 border-t border-[#FAD791]"></div>
          </div>
        </div>
        <div className="w-full max-w-md p-6 rounded-lg shadow-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Kinfolk] font-extrabold text-[#FAD791] mt-2 mb-[70px]">
            EVERGARDEN
          </h1>

          <p className="mt-4 text-[22px] sm:text-[20px] md:text-[22px] font-[Kinfolk] font-semibold text-[#FAD791] mb-[20px]">
            Coming Soon
          </p>
          <p className="text-[18px] sm:text-[16px] md:text-[18px] text-gray-300 font-[Kinfolk]">
            Get notified when the site goes live
          </p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col md:flex-row items-center gap-2 w-full"
          >
            <input
              type="email"
              placeholder="Please enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full md:w-72 rounded-md border border-gray-600 text-white bg-black bg-opacity-50"
              required
            />
            <button
              type="submit"
              className="bg-[#FAD791] text-black px-4 py-3 rounded-md font-semibold hover:bg-[#FFD700] transition cursor-pointer w-full md:w-30  mt-4 md:mt-0 md:ml-4"
            >
              Notify Me
            </button>
          </form>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mt-2">
            Email sent successfully!
          </p>
        )}

        {/* Social Icons Centered and Lower */}
        <div className="mt-10 flex justify-center items-center w-full gap-6 text-gray-400 text-2xl">
          <a
            href="https://www.instagram.com/palak_singh_1378/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="cursor-pointer hover:text-white transition" />
          </a>
          <a
            href="https://www.linkedin.com/in/leena-bhardwaj-834ba21a0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="cursor-pointer hover:text-white transition" />
          </a>
          <a
            href="https://github.com/Leena1408"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="cursor-pointer hover:text-white transition" />
          </a>
        </div>

        {/* Footer */}
        <p className="mt-6 text-gray-500 text-xs w-full text-center">
          &copy; Evergarden 2025, All rights reserved
        </p>
      </div>
    </div>
  );
}
