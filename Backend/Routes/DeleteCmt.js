require("dotenv").config()
const express = require('express')
const DelteCmntRoute = express.Router()
const PostModel = require('../Models/post')
// const UserModel = require('../Models/user')
const CommentModel = require('../Models/comnts')
const TokenVerify = require('../MiddleWare/tokenVerify')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
DelteCmntRoute.use(cookieParser());
DelteCmntRoute.post('/delete-comment/:id', TokenVerify,async (req, res) => {
  try {
    // verify current user is owner of that cmt ?
    // console.log('Cookies:', req.cookies);
    // console.log('Cookies:', req.cookies.token);

     let cmntId=req.params.id
    //  console.log(cmntId)
    //  find the user of that cmt 
     let comment=await CommentModel.findById(cmntId)
    //  console.log(comment)


    // Check if the comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    //  console.log(comment.userId)
     let DbUserid = comment.userId.toString();
    //  console.log(DbUserid)
    //  const token = req.cookies.token
    //  const user =jwt.verify(token, process.env.key)
    //  let {id}= user
    //  console.log(id)
    let {id} = req.user
    // console.log("Token ID :",id)
    // console.log("DB id :",DbUserid)
     if(DbUserid == id){
      let del= await CommentModel.findByIdAndDelete(cmntId)
      // console.log("DEl :" ,del)
      if (!del) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json('Deleted');
      // if (!del) {
      //   return res.status(404).json({ message: 'Cmnt not found' });
      // }
      // res.json('Deleted');
     }
    // else{
    //   res.status(200).json('Deleted');
    // }
    // let res= await CommentModel.findByIdAndDelete(cmntId)
    // console.log(res)
    // res.status(200).json('Deleted');
  } catch (error) {
    console.log("err in Deleting Cmt",error)
  }
})

module.exports= DelteCmntRoute

// app.post('/delete-comment/:id', async (req, res) => {
//     try {
//        let cmntId=req.params.id
//       let del= await CommentModel.findByIdAndDelete(cmntId)
//       // console.log(res)
//       res.status(200).json('Deleted');
//     } catch (error) {
//       console.log(error)
//     }
// })