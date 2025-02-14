

// export default PostPage;
import axios from 'axios';
import React, { useEffect, useState,useContext } from 'react';
import { useParams,Link,Navigate } from 'react-router-dom';
import { AuthContext } from  '../contetxApi/contetx'; // Import AuthContext
import Comnt from './comnt';

const PostPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext); // Access context values
  let [postInfo, setPostInfo] = useState();
  let[redirect,setRedirect] =useState(false)
  const { id } = useParams();
  // console.log(user)

  useEffect(() => {
    axios.get(`http://localhost:3000/postdata/${id}`)
      .then((response) => {
        // console.log(response.data);
        setPostInfo(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  // let deleteFun =()=>{
  //     axios.post(`http://localhost/deletePost/${id}`,{ withCredentials: true })
  //     .then((res)=>{
  //       if(res.data == 'ok'){
  //         setRedirect(true)
  //       }
  //     })
  //     .catch()
  // }
  let deleteFun =()=>{
    axios.post(`http://localhost:3000/deletePost`,{id},{ withCredentials: true })
    .then((res)=>{
      if(res.data == 'ok'){
        setRedirect(true)
      }
    })
    .catch()
}
  if(redirect){
    return <Navigate to='/'/>   // here we have to give return ******
   }

  // if the user is logged in and if he is the author of this post then modify btn comes 
  // ****** if user info == response.user ******

  if (!postInfo) return <div>Loading...</div>;

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Post Image */}
        <img
          // className="w-full h-64 object-cover"
          className="w-full h-70 object-cover object-center rounded-t-lg"
          src={postInfo.post_pic}
          alt={postInfo.title}
        />

        {/* Post Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {postInfo.title}
          </h1>

          

          {/* About */}
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-semibold">About: </span>{postInfo.about}
          </p>

          {/* Description */}
          <div className="prose max-w-none mb-6">
            <div
              dangerouslySetInnerHTML={{ __html: postInfo.description }}
            />
          </div>

          {/* Timestamp */}
          <p className="text-gray-500 text-xs">
            Published on: {new Date(postInfo.createdAt).toLocaleDateString()}
          </p>

          {/* Author Info */}
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src={postInfo.user.image}
              alt={postInfo.user.name}
            />
            <div>
              <p className="text-gray-800 font-semibold">{postInfo.user.name}</p>
              <p className="text-gray-500 text-sm">{postInfo.user.email}</p>
            </div>
            {isLoggedIn && user.id === postInfo.user._id && (
  <div className="flex space-x-4 mt-4">
    <Link to={`/editPost/${postInfo._id}`} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
      Modify
    </Link>
    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600" onClick={deleteFun}>
      Delete
    </button>
  </div>
)}
          </div>

        </div>
      </div>
    </div>
    {/* {console.log(postInfo._id)} */}
      <Comnt Post_ID={postInfo._id}/>
    </>
  );
};

export default PostPage;
