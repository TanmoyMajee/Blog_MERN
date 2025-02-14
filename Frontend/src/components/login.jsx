import React, { useState,useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contetxApi/contetx';
const Login = () => {

  const { loginContex } = useContext(AuthContext);

 let [email,setEmail] = useState('');
 let[password,setPass]=useState('');
 let[redirect,setRedirect]=useState(false)
 

  // Form submit handler
  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle login form submission
    let user=await axios.post('http://localhost:3000/login',{email,password},{withCredentials:true})
    // console.log(user);
    // console.log(user.respose)
    // console.log(user.config.data)
    if(user.data=='ok'){   //as ok isin inside data so... user.data
      // this part dont kmow why i ma fecting data from token , as i should pass user info from backed and based on that data , user will show , but its not working so...
      const userInfo = await axios.get('http://localhost:3000/profile', { withCredentials: true });
        loginContex(userInfo.data);  // Pass the fetched user data to the context
        setRedirect(true);
      // loginContex(user); 
      // setRedirec(true)
    }else{
      alert('Çredential Filed or Pass incrr')
    }
    // if(data.status==200 && data.statusText=='OK'){
    //   // return()
    // }else if(data.status==200 && data.statusText=='OK'){
    //     alert('email Doest Exit')
    // }
    // else{
    //   alert('pass Doesnt match')
    // }
  };

  if(redirect){
   return <Navigate to='/'/>   // here we have to give return ******
  }

  return (
    // {redirect && <Navigate to="/" />}
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      
      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>{setPass(e.target.value)}}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      {/* Don't have an account? */}
      <div className="text-center mt-4">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
