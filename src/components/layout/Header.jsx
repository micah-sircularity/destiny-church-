import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Destiny Church</span>
              <span className="ml-2 text-gray-600">Social Media Manager</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-primary">
              <FaBell className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <FaUserCircle className="h-8 w-8 text-gray-500" />
              <span className="ml-2 text-gray-700 hidden md:block">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
