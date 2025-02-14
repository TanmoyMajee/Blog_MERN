const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
  comment: String,
  userId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'User'
  },
  postId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:'User'
  }
},{timestamps: true})

const CommentModel = mongoose.model("comment",commentSchema)
module.exports = CommentModel