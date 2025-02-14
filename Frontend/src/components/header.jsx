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
              <Link to="/profile" className="block py-2 hover:underline">Profile</Link>
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

// // //
// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contetxApi/contetx'; // Import AuthContext
// import { useLocation } from 'react-router-dom';

// const Header = () => {
//   const { user, isLoggedIn, handleLogout,resetSearchFilters } = useContext(AuthContext); // Access context values
//   const navigate = useNavigate(); // Use navigate for redirection
//   const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
//   // const location = useLocation();
//   // const isHomeRoute = location.pathname === '/';

//   // Function to toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // const handleHomeClick = () => {
//   //   navigate('/'); // Reset to home without any filters (base URL)
//   // };
//   // Handle logout
//   const handleLogoutfun = async () => {
//     try {
//       await handleLogout(); // Call the handleLogout function from context
//       navigate('/'); // Redirect to home
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/" onClick={resetSearchFilters}>MyBlog</Link>
//         </div>

//         {/* Mobile menu button (hamburger) */}
//         <button 
//           className="sm:hidden text-white focus:outline-none"
//           onClick={toggleMenu}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
//           </svg>
//         </button>

//         {/* Navigation + Links */}
//         <nav className={`sm:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} sm:block`}>
//           {/* Home, Contact, and About Links */}
//           <Link to="/" onClick={resetSearchFilters} className="hover:underline">Home</Link>
//           <Link to="/about" className="hover:underline">About</Link>
//           <Link to="/contact" className="hover:underline">Contact</Link>

//           {/* User Info + Logout / Login Register */}
//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={user.img || "/path/to/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">{user.name || "Guest"}</span>
//               </div>

//               {/* Logout and Create Post Buttons */}
//               <button
//                 onClick={handleLogoutfun}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={() => { navigate('/post'); }}
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Create Post
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Guest Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.yHRsNNmpWt4O-hMl7C5dkgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>

//               {/* Login and Register Buttons */}
//               <Link
//                 to="/login"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useContext, useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contetxApi/contetx'; // Import AuthContext
// import { useLocation } from 'react-router-dom';

// const Header = () => {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext); // Access context values
//   const navigate = useNavigate(); // Use navigate for redirection
//   const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
//   const isHomeRoute = location.pathname === '/';

//   // Function to toggle mobile menu
//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // Handle logout
//   const handleLogoutfun = async () => {
//     try {
//       await handleLogout(); // Call the handleLogout function from context
//       navigate('/'); // Redirect to home
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/">MyBlog</Link>
//         </div>

//         {/* Mobile menu button (hamburger) */}
//         <button 
//           className="sm:hidden text-white focus:outline-none"
//           onClick={toggleMenu}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
//           </svg>
//         </button>

//         {/* Navigation + Search bar */}
//         <nav className={`sm:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} sm:block`}>
//           {/* Search bar */}
//           <div className="relative mt-2 sm:mt-0">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Home, Contact, and About Links */}
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/about" className="hover:underline">About</Link>
//           <Link to="/contact" className="hover:underline">Contact</Link>

//           {/* User Info + Logout / Login Register */}
//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={user.img || "/path/to/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">{user.name || "Guest"}</span>
//               </div>

//               {/* Logout and Create Post Buttons */}
//               <button
//                 onClick={handleLogoutfun}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={() => { navigate('/post'); }}
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Create Post
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Guest Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.yHRsNNmpWt4O-hMl7C5dkgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>

//               {/* Login and Register Buttons */}
//               <Link
//                 to="/login"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useContext } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from  '../contetxApi/contetx'; // Import AuthContext

// const Header = () => {
//   const { user, isLoggedIn, handleLogout } = useContext(AuthContext); // Access context values
//   const navigate = useNavigate(); // Use navigate for redirection
 
//   // cheking the user and logged in
//   // console.log(isLoggedIn)
//   // console.log(user)
//   // console.log(user.name)
//   // console.log(user.img)


//   const handleLogoutfun = async () => {
//     try {
//       await handleLogout(); // Call the handleLogout function from context
//       navigate('/'); // Redirect to home
//       // return <NavLink to='/'/>
//     } catch (error) {
//       console.error('Logout failed', error);
//     }
//   };

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/">MyBlog</Link>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center space-x-4">
//           {/* Home, Contact, and About Links */}
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/about" className="hover:underline">About</Link>
//           <Link to="/contact" className="hover:underline">Contact</Link>

//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 {/* Profile Pic */}
//                 <img
//                   src={user.img || "/path/to/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 {/* User Name */}
//                 <span className="font-semibold">{user.name || "Guest"}</span>
//               </div>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogoutfun}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//               <button
//                 onClick={()=>{navigate('/post')}}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Create Post
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Default Guest Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.yHRsNNmpWt4O-hMl7C5dkgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>

//               {/* Login and Register */}
//               <Link
//                 to="/login"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link,NavLink } from 'react-router-dom';

// const Header = () => {
//   //{ isLoggedIn, user, handleLogout }
// //   let [isLoggedIn,setLoggedin]=useState(false)
// //   let[user,setUser] =useState(null);
// // // useEffect(async ()=>{
// // //  let info = await axios.get('http://localhost:3000/profile',{withCredentials:true})
// // //  console.log(info)
// // //   },[])
// // useEffect(() => {
// //   const fetchProfile = async () => {
// //     try {
// //       const info = await axios.get('http://localhost:3000/profile', { withCredentials: true });
// //       console.log(info);
// //       setUser(info)
// //       setLoggedin(true)
// //     } catch (error) {
// //       console.error("Error fetching profile", error);
// //     }
// //   };

// //   fetchProfile();
// // },[]);

// // let handleLogout =async ()=>{
// //  await axios.post('http://localhost:3000/logout',{withCredentials:true})
// //   setLoggedin(false)
// //   setUser(null);
// //   navigate('/');
// // }

//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <Link to="/">MyBlog</Link>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center space-x-4">
//           {/* Home, Contact, and About Links */}
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/about" className="hover:underline">About</Link>
//           <Link to="/contact" className="hover:underline">Contact</Link>

//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 {/* Profile Pic */}
//                 <img
//                   src={user.profilePic || "/path/to/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 {/* User Name */}
//                 <span className="font-semibold">{user.name || "Guest"}</span>
//               </div>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogout} 
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Default Guest Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.yHRsNNmpWt4O-hMl7C5dkgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>

//               {/* Login and Register */}
//               <Link
//                 to="/login"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

 // // Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = ({ isLoggedIn, user, handleLogout }) => {
//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           {/* <a href="/">MyBlog</a> */}
//           <Link to={'/'}>MyBlog</Link>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center space-x-4">
//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 {/* Profile Pic */}
//                 <img
//                   src={user.profilePic || "/path/to/default-avatar.png"}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 {/* User Name */}
//                 <span className="font-semibold">{user.username || "Guest"}</span>
//               </div>

//               {/* Logout Button */}
//               <button
//                 // onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Default Guest Section */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.yHRsNNmpWt4O-hMl7C5dkgAAAA?w=162&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>

//               {/* Login and Register */}
//               <Link to={'/login'}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </Link>
//               <Link to={'/register'}
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React from 'react';

// const Header = ({ isLoggedIn, user }) => {
//   return (
//     <header className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <a href="/">MyBlog</a>
//         </div>

//         {/* Navigation */}
//         <nav className="flex items-center space-x-4">
//           {isLoggedIn ? (
//             <>
//               {/* Profile Section */}
//               <div className="flex items-center space-x-2">
//                 {/* Profile Pic */}
//                 <img
//                   src={user.profilePic}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 {/* User Name */}
//                 <span className="font-semibold">{user.username}</span>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Default Guest Display */}
//               <div className="flex items-center space-x-2">
//                 <img
//                   // src="/path/to/default-avatar.png"
//                   src='https://via.placeholder.com/40'
//                   alt="Guest"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="font-semibold">Guest</span>
//               </div>
//             </>
//           )}

//           {!isLoggedIn && (
//             <>
//               <a
//                 href="/login"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Login
//               </a>
//               <a
//                 href="/register"
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//               >
//                 Register
//               </a>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React from 'react';

// const Header = () => {
//   return (
//     <div className="bg-gray-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <a href="/">MyBlog</a>
//         </div>

//         {/* Navigation */}
//         <nav className="space-x-4">
//           <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
//             Login
//           </a>
//           <a href="/register" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
//             Register
//           </a>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Header;
