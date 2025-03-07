const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs');
const UserModel = require('../Models/user')
RegisterRouter.post('/register',async (req,res)=>{
  // destructure the data coming fromregister page
  // const { username, email, password } = req.body;
 // const pic = req.file.filename   // this is destrute fro file 
  // let {name,email,password} = req.body
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.userPass,salt,async (err,hash)=>{
        // now store the hash value in DB 
        let user=await UserModel.create({
          name:req.body.userName,
          email:req.body.userEmail,
          password:hash,
          image:req.body.URL
         })
         if(user){
          // res.send('registration succesfull',user)
          res.status(201).json({
            message: 'Registration successful',
            // here i need to send the user data to the front end but i will not send the password
            user: {
              name: user.name,
              email: user.email,
              image: user.image
            }
          });
        }else{
          // res.send("Registraaiton err")
          res.status(400).json({
            message: 'Registration failed'
          });
        }
    })
  })
})

module.exports = RegisterRouter