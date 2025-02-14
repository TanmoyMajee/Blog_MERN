// import { createContext, useState, useEffect } from 'react';

// // now use createContext method
// export const UserContext = createContext(null);

// // now create a provider function

// export const UserProvider= (childern)=>{

//   return <UserContext.Provider>{children}<UserContext.Provider/>
// }

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);  // Boolean to track login status
  const [user, setUser] = useState(null);  // Store the logged-in user's data
  // const navigate = useNavigate();

  // Function to log in the user and set the user data globally
  const loginContex = (userData) => {
    setUser(userData);  // Store user info like name, email, etc.
    setLoggedIn(true);  // Set logged-in state to true
  };

  // Function to log out the user and clear user data  withCredentials
  const handleLogout = async () => {
    try {
      const info = await axios.post('http://localhost:3000/logout', {  withCredentials: true });
      // console.log(info)
      setLoggedIn(false);  // Set logged-in state to false
      setUser(null);       // Clear the user data
      // navigate('/');       // Redirect to the home page after logout
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  // Fetch user data on mount (based on a valid session cookie)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const info = await axios.get('http://localhost:3000/profile', { withCredentials: true });
        if(info)setUser(info.data);  // Set user data if session is valid
        if(info)setLoggedIn(true);   // Mark user as logged in
      } catch (error) {
        console.error("Error fetching profile", error);
        setLoggedIn(false);  // If error occurs, treat as logged out
      }
    };

    fetchProfile();
  }, []);

  // Home Page Data Fetch FUnction for all user
   // State for search filters
    let [globatTitl,setGlobalTitl] = useState('')

    // Function to update search filters
    // const updateSearchFilters = (filters) => {
    //   setSearchFilters(filters);
    // };
    // Function to reset search filters
  const resetSearchFilters = () => {
    setGlobalTitl('')
    // console.log(globatTitl)
  };

  // const homePageAPIcall =async ()=>{
  //  const response= await axios.get('http://localhoast:3000/get-post')

  // }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginContex, handleLogout ,globatTitl,setGlobalTitl,resetSearchFilters}}>
      {children}
    </AuthContext.Provider>
  );
};
