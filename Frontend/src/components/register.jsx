import React, { useState ,useContext} from 'react';
import { Link,Navigate,NavLink } from 'react-router-dom';
import { AuthContext } from '../contetxApi/contetx';
import axios from 'axios';
// fire Base import
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"

const Register = () => {
  // Form state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userPic, setUserPic] = useState(null);
  let[redirect,setRedirect]=useState(false)
  // here the context premes commin
  const { loginContex } = useContext(AuthContext);


  // Form submit handler
  const handleSubmit =async (e) => {
    e.preventDefault();

      // fireBase code
  const ImageRef = ref(storage,`user_images/${Date.now()}`)
await uploadBytes(ImageRef, userPic);
    console.log("Image uploaded successfully");
const URL =await getDownloadURL(ImageRef)
console.log(URL)

    // const formData = new FormData();
    // formData.append('userName', userName);
    // formData.append('userEmail', userEmail);
    // formData.append('userPass', userPass);
    // formData.append('userPic', userPic); // Append the image file
    // console.log(formData);
    // Add form submission logic here
      // Axios request with multipart/form-data
      try {
        const response = await axios.post('http://localhost:3000/register', {userName,userEmail,userPass,URL}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Success:', response.data);
        console.log('Success:', response.data.user);  
        // here after registratin i should redirec to home page , but as the token is generaated only after login , 
          // if i dont give token just redirected to home page , then after relodin of page user will not be logged in
        // return <Navigate to='/login'/>
        setRedirect(true)
        // loginContex(response.data.user)
        // return <NavLink to="/"/>  // redirectt to home page
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  //  await axios.post('http://localhost:3000/register',formData,{userName,userEmail,userPass,userPic})
  //   .then((result)=>{console.log(result)})
  //   .catch((err)=>{console.log(err)})
  // };

if(redirect){
  return<Navigate to='/login'/>
}

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            // **************  No need to put value here , as its a file **************
            onChange={(e) => setUserPic(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>

      {/* Already have an account */}
      <div className="text-center mt-4">
        <p className="text-gray-600">Already have an account?</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // const Register = () => {
// //   // Form state
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     profilePic: null, // Image file
// //   });

//   const[userName,setUserName] = useState('')
//   const[userEmail,setUserEmail] = useState('')
//   const[userPass,setUserPass] = useState('')
//   const[userPic,setUserPic]=useState(null)
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle image upload
//   // const handleImageChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     profilePic: e.target.files[0], // Set image file
//   //   });
//   // };

//   // Form submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, send formData to backend
//     // console.log(formData);
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      
//       {/* Registration Form */}
//       <form onSubmit={handleSubmit}>
//         {/* Username */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={()=>{setUserName(e.target.value)}}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userEmail}
//             onChange={()=>{setUserEmail(e.target.value)}}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={userPass}
//             onChange={()=>{setUserPass(e.target.value)}}
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Profile Picture */}
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePic">
//             Profile Picture
//           </label>
//           <input
//             type="file"
//             id="profilePic"
//             name="profilePic"
//             accept="image/*"
//             value={userPic}
//             onChange={()=>{setUserPic(e.target.files[0])}}
//             className="w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Register
//         </button>
//       </form>

//       {/* Already have an account */}
//       <div className="text-center mt-4">
//         <p className="text-gray-600">Already have an account?</p>
//         <Link to="/login" className="text-blue-500 hover:underline">
//           Login here
//         </Link>
//       </div>
//     </div>
//   );


// export default Register;
