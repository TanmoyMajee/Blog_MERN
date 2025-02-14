require("dotenv").config()
const express = require('express')
const GetPostRouter = express.Router()
const PostMode = require('../Models/post')
// const TokenVerify = require('../MiddleWare/tokenVerify')

GetPostRouter.get('/get-post', async (req, res) => {
  // sorting, and searching
  // console.log(req.query)
  let {title,genre,author} = req.query
  const filter = {}
  if(title){
    filter.title = { $regex: title, $options: 'i' };
  }
  if(author){
    filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search for author
  }
  if(genre){
    filter.genre = { $regex: genre, $options: 'i' }; // Case-insensitive search for genre
  }
  // console.log(filter)

  // Pagination,
  let { page } = req.query;
  let pg = Number(page) || 1;   // Default to page 1 if no page is provided
  let lim = 6;                  // Limit the number of posts per page
  let skp = (pg - 1) * lim;     // Calculate the number of posts to skip for the current page

  try {
    // Get the total number of posts (for pagination)
    let totalPosts = await PostMode.countDocuments(filter);

    // Fetch the posts for the current page
    let allPost = await PostMode.find(filter)
      .populate('user', ['name'])
      .skip(skp)
      .limit(lim);

    // Calculate if there are more posts available
    let hasMore = (pg * lim) < totalPosts;

    // Send posts and whether there are more posts to load
    res.json({
      posts: allPost,
      hasMore: hasMore,   // Will be false if there are no more posts
      // totalPages: Math.ceil(totalPosts / lim),  // Optionally, include total pages
      totalPosts : totalPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


module.exports = GetPostRouter