const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
  title: String,
  about:String,
  description:String,
  post_pic:String,
  user:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'User'
  }
},{timestamps: true})

const PostModel = mongoose.model("Post",postSchema)
module.exports = PostModel