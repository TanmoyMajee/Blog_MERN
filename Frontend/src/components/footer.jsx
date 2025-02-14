import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Site Name */}
        <div className="text-2xl font-bold mb-2">
          MyBlog
        </div>

        {/* Links Section */}
        <nav className="space-x-4 mb-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          {/* <a href="/privacy" className="hover:underline">Privacy Policy</a> */}
        </nav>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
