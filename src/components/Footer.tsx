import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 py-6 text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Marwan Khan. All rights reserved.
      </p>

      <a
        href="https://marwan-coding.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
      >
        Visit My Portfolio
      </a>
    </footer>
  );
};

export default Footer;