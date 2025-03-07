require("dotenv").config()
const express = require('express')
// const TokenVerify = express()
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/user')
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken');

const TokenVerify =async (req,res,next)=>{
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

      const user =jwt.verify(token, process.env.key)
      const {id} = user
      // let userone = await UserModel.findOne({_id:id})
      req.user = user
      // req.userone= userone
      next();
  } catch (error) {
    console.log(`Middlware Error ${error}`)
    res.send('Middlware Error')
  }
}

module.exports = TokenVerify
