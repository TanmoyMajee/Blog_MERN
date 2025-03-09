import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contetxApi/contetx';

const Header = () => {
  const { user, isLoggedIn, handleLogout, resetSearchFilters } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle logout
  const handleLogoutfun = async () => {
    try {
      await handleLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  // header fixed top-0 w-full z-50 bg-white shadow-md
  return (
    <header className=" bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" onClick={resetSearchFilters}>MyBlog</Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="sm:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Normal navigation for larger screens */}
        <nav className="hidden sm:flex items-center space-x-4">
          <Link to="/" onClick={resetSearchFilters} className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>

          {/* Authenticated User */}
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={user.img || "/path/to/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{user.name || "Guest"}</span>
              </div>
              <button
                onClick={handleLogoutfun}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/post')}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Create Post
              </button>
            </>
          ) : (
            <>
            <div className="flex justify-center items-center space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded  "
              >
                 Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                  Register
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden px-6 pb-4">
          <Link to="/" onClick={resetSearchFilters} className="block py-2 hover:underline">Home</Link>
          <Link to="/about" className="block py-2 hover:underline">About</Link>
          <Link to="/contact" className="block py-2 hover:underline">Contact</Link>
          {isLoggedIn ? (
            <>
              {/* <Link to="/profile" className="block py-2 hover:underline">Profile</Link> */}
              {/* ****************** */}
              <div className="flex items-center space-x-2">
                <img
                  src={user.img || "/path/to/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{user.name || "Guest"}</span>
              </div>
              
              <button
                onClick={handleLogoutfun}
                className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded mt-2"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/post')}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded mt-2"
              >
                Create Post
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

