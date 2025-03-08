require("dotenv").config()
// import express from 'express';
const express = require('express');
const app = express();
// const cors = require('cors');
const UserModel = require('./Models/user')
const PostMode = require('./Models/post')
const CommentModel = require('./Models/comnts')
const cookieparser = require('cookie-parser')
app.use(cookieparser())
// app.use(cors({
//   origin: 'http://localhost:5173',  // The frontend's domain
//   credentials: true  // Allow cookies and credentials to be sent
// }));
const cors = require('cors');

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
const multer  = require('multer')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
// const key = 'DKJHSKJHDKJSKJ12345';


app.use(express.json())
// app.use(express.urlencoded())
app.get('/',(req,res)=>{
  res.send("Hello")
})


const mongoose = require('mongoose');
const PostModel = require('./Models/post');

//mongoose.connect("mongodb://127.0.0.1.27017/Bog");

mongoose.connect(process.env.MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB2');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
})
//Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads_profile_pic')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null,uniqueSuffix+file.originalname)  // here u cant put file name first ***
//   }
// });

// const upload = multer({ storage: storage })

const RegisterRouter = require('./Routes/Register')
app.use(RegisterRouter)

const LoginRoute = require('./Routes/Login')
app.use(LoginRoute)

const ProfileRoute = require('./Routes/Profile')
app.use(ProfileRoute)

const LogoutRoute = require('./Routes/Logout')
app.use(LogoutRoute)

const CreatePostRoute = require('./Routes/Post')
app.use(CreatePostRoute)

const GetPostRouter = require('./Routes/get-post')
app.use(GetPostRouter)

const EditPostRoute = require('./Routes/EditPost')
app.use(EditPostRoute)

const DeletePostRoute = require('./Routes/DeletePost')
app.use(DeletePostRoute)

const CreateCommentRoute = require('./Routes/CreateComment')
app.use(CreateCommentRoute)

const GetAllCmntRoute = require('./Routes/GetAllCmnt')
app.use(GetAllCmntRoute)

const DelteCmntRoute= require('./Routes/DeleteCmt')
app.use(DelteCmntRoute)

const contact_usRoute = require('./Routes/contact_us')
app.use(contact_usRoute)

// Multer file name & description for post img
// const storage1 = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads_post')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null,uniqueSuffix+file.originalname)  // here u cant put file name first ***
//   }
// });

// const upload1 = multer({ storage: storage1 })

app.get('/postdata/:id',async (req,res)=>{
  let {id}=req.params
  let Post=await PostMode.findById(id).populate('user',['name','email','image']) // here we are sending all the post model data and user data [name,email,image] 
  res.json(Post)
}) 

app.get((req,res)=>{
  res.send(`<h1> Page Not Found</h1>`)
})

app.listen(process.env.PORT,()=>{
  console.log(`App is Listining at port : ${process.env.PORT}`)
}) 