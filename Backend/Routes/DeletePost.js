const express = require('express')
const DeletePostRoute = express.Router()
const PostModel = require('../Models/post')
const UserModel = require('../Models/user')
const TokenVerify = require('../MiddleWare/tokenVerify')

DeletePostRoute.post('/deletePost',TokenVerify,async (req,res)=>{
  let {id} = req.body
  console.log('Delete post request received:', req.body);
    // first chek if the usre is the valid autor
    // let token = req.cookies.token;  // here we need to verify token to chek who is the owner of this post 
    // if (!token) {
    //   return res.status(401).json({ message: 'Token not provided' });
    // }
    // now verify the token
    // jwt.verify(token, process.env.key, {},async (err, info)=>{
      let postData = await PostModel.findById(id).populate('user',['_id'])
    // // console.log(postData.user._id)
    let userId = postData.user._id
    let tokenUserID = req.user.id
    // console.log(info)
    if(userId == tokenUserID){
    let del =   await PostModel.findByIdAndDelete(id)
    // console.log(del)
    if (!del) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json('ok');
    }else{
      res.json('not valid author')
    }
    
    })
// })

module.exports = DeletePostRoute