require("dotenv").config()
const express = require('express')
const ProfileRoute = express.Router()
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user')
const TokenVerify = require('../MiddleWare/tokenVerify')

ProfileRoute.get('/profile',TokenVerify, (req, res) => {
  // let token = req.cookies.token;  // Updated from 'coke' to 'token'
  // if (!token) {
  //   return res.status(401).json({ message: 'Token not provided' });
  // }

  // jwt.verify(token, process.env.key, {}, (err, info) => {
  //   if (err) {
  //     return res.status(403).json({ message: 'Token is invalid' });
  //   }
  //    //console.log(info)  //checking the cookie data 
  //   res.json(info);  // Return the decoded token information
  // console.log(req.user)
  const user = req.user
  res.json(user)
  })
// });

module.exports = ProfileRoute

// app.get('/profile',(req,res)=>{
//     let {coke} = req.cookies
//     jwt.verify(coke,key,{},(err,info)=>{
//       if(err)throw err;
//         console.log(info)
//     })
// })
