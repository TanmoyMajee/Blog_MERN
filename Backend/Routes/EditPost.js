const express = require('express')
const EditPostRoute = express.Router()
const PostModel = require('../Models/post')
const UserModel = require('../Models/user')
const TokenVerify = require('../MiddleWare/tokenVerify')

EditPostRoute.post('/editpost/:id',TokenVerify,async (req,res)=>{
  let {id} = req.params
  let {title,URL,about,description} =req.body

    let postData = await PostModel.findById(id).populate('user',['_id'])
    // console.log(postData.user._id)
    let userId = postData.user._id
    // console.log(info)
    let tokenUserID = req.user.id 
    if(userId == tokenUserID){
      // valid user
      await PostModel.findByIdAndUpdate(id,{
        title,
        about,
        description,
        post_pic:URL
      })
      res.json('ok')
    }else{
      res.json('Invalid Author')
    }
  })
 

module.exports = EditPostRoute