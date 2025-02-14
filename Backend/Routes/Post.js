require("dotenv").config()
const express = require('express')
const CreatePostRoute = express.Router()
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user')
const PostMode = require('../Models/post')
const TokenVerify = require('../MiddleWare/tokenVerify')

CreatePostRoute.post('/post',TokenVerify,async (req,res)=>{
  // let pic = req.file.filename
  let {title,about,description,URL} =  req.body
  // let token = req.cookies.token;  // here we need to verify token to chek who is the owner of this post 
  // if (!token) {
  //   return res.status(401).json({ message: 'Token not provided' });
  // }

  // jwt.verify(token, process.env.key, {},async (err, info) => {
  //   if (err) {
  //     return res.status(403).json({ message: 'Token is invalid' });
  //   }
    //  console.log(req.user)
     const user = req.user
     await PostMode.create({
      title,
      about,
      description,
      post_pic : URL,
      user : user.id  //here we stote the owner id 
    })               //( token user id , so that we can later find who is the owner)
    // res.json(info);  // Return the decoded token information
  // now inser it in DB
//  let user = await PostMode.create({
//     title,
//     about,
//     description,
//     post_pic : pic
//   })
  // console.log(user)
  res.json('ok')
})

module.exports = CreatePostRoute