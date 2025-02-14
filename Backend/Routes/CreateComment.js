const express = require('express')
const CreateCommentRoute = express.Router()
const PostModel = require('../Models/post')
// const UserModel = require('../Models/user')
const CommentModel = require('../Models/comnts')
const TokenVerify = require('../MiddleWare/tokenVerify')

CreateCommentRoute.post('/new-comment', async (req, res) => {
  let { newComment, user, Post_ID } = req.body;

  try {
    let cmt = await CommentModel.create({
      comment: newComment,
      userId: user.id,
      postId: Post_ID
    });

    res.status(200).json({
      success: true,
      comment: cmt
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = CreateCommentRoute