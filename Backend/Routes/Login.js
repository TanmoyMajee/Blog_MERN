// // require("dotenv").config()
// // const express = require('express')
// // const LoginRoute = express.Router()
// // const bcrypt = require('bcrypt');
// // const cookieparser = require('cookie-parser')
// // const jwt = require('jsonwebtoken');
// // const UserModel = require('../Models/user')
// // // const key = 'DKJHSKJHDKJSKJ12345';

// // LoginRoute.post('/login',async (req,res)=>{
// //   let {email,password} = req.body;
// //   // first find if there exist any user or not 
// //   // then chek the pass
// //   let user = await UserModel.findOne({email:email})
// //   // console.log(user) if found then it will be not null
// //    //chek if pass is correct with hashed pass
// //    if(user){
// //       // now chek
// //       bcrypt.compare(password,user.password,(err,result)=>{
// //         if(result){
// //           // res.status(200).send('Pass Match')
// //           // jwt.sign({ name : user.name,id:user._id }, key,{},(err,token)=>{
// //           //   res.cookie('token',token).json('ok');
// //           // });
// //           jwt.sign({ name: user.name, email: user.email,img: user.image, id: user._id },process.env.key, {}, (err, token) => {
// //             if (err) {
// //               return res.status(500).json({ message: "Token generation failed" });
// //             }
// //             //console.log(user) // checkinfcheking the user info 
// //             res.cookie('token', token,{ httpOnly: true }).json('ok').send(user);
// //           });
          
// //           // res.send('success')
// //         }else{
// //           // res.status(400).statusMessage('NO').send('Pass INcorrect')
// //           res.send('Pass incorrect')
// //         }
// //       })
// //    }else{
// //     // res.status(400).send('Email Not Exist')
// //     res.send('email not found')
// //    }
// // })

// // module.exports = LoginRoute

// require("dotenv").config();
// const express = require('express');
// const LoginRoute = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../Models/user');

// LoginRoute.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find user by email
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(404).send('Email not found');

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Pass incorrect');

//     // Generate JWT token
//     jwt.sign(
//       { name: user.name, email: user.email, img: user.image, id: user._id },
//       process.env.key,
//       {},
//       (err, token) => {
//         if (err) {
//           return res.status(500).json({ message: "Token generation failed" });
//         }
//         // Set cookie and respond
//         res.cookie('token', token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production", // use true if on HTTPS
//           sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
//           path: "/", // ensures cookie is available on all routes
//         });
//         res.status(200).json({ message: 'ok', user });
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = LoginRoute;
 require("dotenv").config();
const express = require('express');
const LoginRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');

LoginRoute.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).send('Email not found');

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Pass incorrect');

    // Generate JWT token
    jwt.sign(
      { name: user.name, email: user.email, img: user.image, id: user._id },
      process.env.key,
      {},
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Token generation failed" });
        }
        // Set cookie and respond
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // use true if on HTTPS
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          path: "/", // ensures cookie is available on all routes
        });
        res.status(200).json({ message: 'ok', user });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = LoginRoute;