

import axios from 'axios';
import React, { useState } from 'react';
import {NavLink,Navigate,useNavigate} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
//firebase import 
//import { getStorage} from '../firebase'; // Import storage from the config
// import { ref, uploadBytes, getDownloadURL } from '../firebase/storage';
import {storage} from '../firebase'
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  let[redirect,setRedirect]=useState(false)

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'],  // Removed 'image' here to disable image uploading
      ['clean']  
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

// Fire Base Code
const ImageRef = ref(storage,`post_images/${Date.now()}`)
await uploadBytes(ImageRef, image);
    console.log("Image uploaded successfully");
const URL =await getDownloadURL(ImageRef)
console.log(URL)
// setImage(URL)
// console.log(image)


    const formData = new FormData();
    formData.append('title', title);
    formData.append('about', about);
    formData.append('description', description);
    formData.append('image', URL);
    // console.log(formData) we cant see from data this way 
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    let response = await axios.post('https://blog-mern-backend-x81a.onrender.com/post', {title,about,description,URL}, {
      headers: {'Content-Type': 'application/json'},
      withCredentials:true
    });
    // console.log(response.data);
    // console.log(response.status);
    if(response.data == 'ok'){
      alert("Post Creaed SuccessFully")
      navigate("/")
      // setRedirect(true);

    }
  };

  // console.log(redirect)
  if(redirect){
    return <Navigate to="/" />;  // here we have to give return ******
   }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* About */}
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            About
          </label>
          <input
            type="text"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Quill Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <div className="bg-white p-2 rounded shadow-sm border border-gray-300"> {/* Updated styles */}
            <ReactQuill
              value={description}
              onChange={(e) => setDescription(e)}
              theme="snow"
              className="min-h-[150px] bg-white"   // Setting a min height and white background to extend dynamically
              modules={modules}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4 clear-both"> {/* Clear both to avoid overlap */}
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => { setImage(e.target.files[0]); }}
            className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

