// import axios from 'axios';
// import React, { useEffect, useState,useContext } from 'react';
// import { AuthContext } from '../contetxApi/contetx';

// const Comments = ({Post_ID}) => {
//   // 1. Initialize state for comments and new comment text
//   // console.log(`Post id ${Post_ID}`)
//   const { user, isLoggedIn } = useContext(AuthContext);
//   const [comments, setComments] = useState([]); // Comments list
//   const [newComment, setNewComment] = useState(''); // User input for new comment
//   const [recentComnt, setRecentCmnt] = useState(false)

//   // Fetch all the Commentts of that post
//   // useEffect(async ()=>{
//   //         // let response=await axios.get('http://localhost:3000/get-comments')
//   //         // console.log(response);
//   // },[recentComnt]) // Dependesy will be when i submit the form then 

//   // 2. Function to handle submitting a new comment
//   const handleCommentSubmit = async () => {
//     // first chek if the user is Logged In or nt
//     if(!isLoggedIn){
//       alert("LOGIN FIRST")
//     }else{
//     if(!newComment){
//       alert("Enter sometng")
//     }
//     else{
//     // Call API to post new comment
//     let response=await axios.post('http://localhost:3000/new-comment',{newComment,user,Post_ID})

//     // If successful, add the new comment to the existing list
//     if (response.success) {
//       setComments([...comments, response.comment]); // Update the state
//       setNewComment(''); // Clear the input field
//       setRecentCmnt(!recentComnt)
//     }
//   }
// }
//   };

//   return (
//     <div className="mt-4">
//       {/* Comment input field */}
//       <div className="container mx-auto p-4">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
//         />
//         <button
//           onClick={handleCommentSubmit}
//           className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Submit
//         </button>
//       </div>

//       {/* Comments list */}
//       <div className="comments-list space-y-4">
//         {comments.map((comment) => (
//           <div key={comment.id} className="comment-item p-4 border border-gray-300 rounded-lg">
//             <p className="font-semibold">{comment.username}</p>
//             <p className="text-gray-800">{comment.text}</p>
//             <small className="text-gray-500">{comment.timestamp}</small>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;


import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contetxApi/contetx';

const Comments = ({ Post_ID }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [comments, setComments] = useState([]); // Comments list
  const [newComment, setNewComment] = useState(''); // User input for new comment
  const [recentComnt, setRecentCmnt] = useState(false);
  const [delCommnt, setDelCommnt] = useState(false);

  // Fetch comments when component loads or after a new comment is submitted
  useEffect(() => {
    const fetchComments = async () => {
      try {
        let response = await axios.get(`http://localhost:3000/get-comments/${Post_ID}`);
        // console.log(response)
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [Post_ID, recentComnt,delCommnt]); // Dependencies ensure re-fetching after submission

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      alert("LOGIN FIRST");
    } else if (!newComment) {
      alert("Enter something");
    } else {
      try {
        let response = await axios.post('http://localhost:3000/new-comment', { newComment, user, Post_ID });

        if (response.data.success) {
          setNewComment(''); // Clear input
          setRecentCmnt(!recentComnt); // Re-fetch comments
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const deleteCommnt =async (commntId)=>{
    try {
     let res =await axios.post(`http://localhost:3000/delete-comment/${commntId}`,{},{ withCredentials: true })
    //  console.log(res)
     setDelCommnt(!delCommnt)
    } catch (error) {
      console.log("DElet FEtch ERR",err)
    }
  }
  // console.log(user)
  //  console.log(comments)
  return (
    <div className="mt-4">
      {/* Comment input field */}
      <div className="container mx-auto p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 bg-white shadow-lg rounded-lg overflow-hidden"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </div>

      {/* Comments list */}
      <div className="comments-list space-y-4">
        {comments.map((cmnt) => (
         <div key={cmnt._id} className="comment-item p-4 border border-gray-300 rounded-lg flex items-start space-x-4">
         {/* User Image */}
         <img
           src={cmnt.userId.image}  // Assuming cmnt.userId.image contains the image URL
           alt={`${cmnt.userId.name}'s profile`}
           className="w-12 h-12 rounded-full object-cover"
         />
       
         {/* Comment Content */}
         <div>
           <p className="font-semibold text-gray-800">{cmnt.userId.name}</p> {/* User name */}
           <p className="text-gray-700">{cmnt.comment}</p>  {/* Comment text */}
           <small className="text-black">{new Date(cmnt.createdAt).toLocaleString()}</small>  {/* Timestamp */}
         </div>
          {/* if the logged in user id = post owner id then show the del btn */}
          {
                 isLoggedIn && user.id == cmnt.userId._id && 
  <button onClick={()=>{deleteCommnt(cmnt._id)}} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300">
    DELETE
  </button>
}
       </div>
       
        ))}
      </div>
    </div>
  );
};

export default Comments;
