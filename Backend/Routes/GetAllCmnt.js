const express = require('express')
const GetAllCmntRoute = express.Router()
const PostModel = require('../Models/post')
// const UserModel = require('../Models/user')
const CommentModel = require('../Models/comnts')
const TokenVerify = require('../MiddleWare/tokenVerify')

GetAllCmntRoute.get('/get-comments/:id', async (req, res) => { 
  try {
    // console.log(req.params); // Log the request parameters for debugging
    let postId = req.params.id; // Extract the post ID from the request parameters
    let comments = await CommentModel.find({ postId: postId }).populate('userId',['name','image']).sort({ createdAt: -1 });  // Filter comments by postId
    // console.log(comments)

    res.status(200).json({
      comments: comments // Send the comments back to the client
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = GetAllCmntRoute