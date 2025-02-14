import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function contact_us() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const navigate = useNavigate();
  const submitFun =async (e)=>{
    e.preventDefault();
    let res =await axios.post('http://localhost:3000/contact_us',{name,email,message})
    console.log(res)
    setName('')
    setEmail('')
    setMessage('')
    if(res.data=="ok"){
      alert('Mail Send SuccessFul')
      navigate('/')
    }
  }
  return (
    <>
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" >
  <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Contact Us</h2>

    <form onSubmit={submitFun} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Your Name</label>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" id="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

      <div>
        <label  className="block text-sm font-medium text-gray-700">Message</label>
        <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name="message" id="message" rows="4" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required/>
      </div>

      <div className="text-center">
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Send Message
        </button>
      </div>
    </form>
  </div>
</div>
</>
  );
};

export default contact_us

// value={message} onChange={(e)=>{setMessage(e.target.value)}}