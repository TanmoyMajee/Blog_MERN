require("dotenv").config()
const express = require('express')
const LogoutRoute = express.Router()
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user')
LogoutRoute.use(cookieparser());
const TokenVerify = require('../MiddleWare/tokenVerify')

LogoutRoute.post('/logout',async (req,res)=>{
  const token=req.cookies.token;
  // console.log(token)
  // let tk = "abced"
  // let token1
  // res.cookie('token',' ',{
  //   httpOnly: true,
  //   secure: false,   // Set to true if you're using HTTPS
  //   sameSite: 'strict', // Match this with your original setting
  //   path: '/',        // Ensure this matches the path used to set the cookie
  //   expires: new Date(0)
  // }).json('Logout') 
  
  res.clearCookie('token',{ path: '/' }).json('Logout') 
  // userone = await UserModel.findOne({_id:id})
  //  await userone.save()
  // res.status(200).send({ message: 'Logout successful' })
})

module.exports = LogoutRoute