// const express = require('express')
// const app=express()
// const connectDB = require('./DB/connect')
// const user_routes = require('./routs/user')
// require('dotenv').config()

// // app.get('',(req,res)=>{
// //     res.send('Hi jdslakfh')
// // })

// // Middleware
// app.use('/',user_routes)
// // process.env.MONGODB_URI
// const PORT = process.env.PORT || 3000
// const start =async ()=>{
//   try {
//     await connectDB()
//     app.listen(PORT,()=>{
//       console.log(`App is Listning in Port : ${PORT}`)
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
// start()

// ************ Routes  ************
// const express = require('express')
// const router=express.Router()
// const {homeRoute,TestRoute} = require('../controllers/cnt')

// router.route('/').get(homeRoute)
// router.route('/test').get(TestRoute)

// module.exports = router;

//  ************Controller*********

// const { STATES } = require("mongoose")
// const producetModel = require('../Model/produce')

// const homeRoute =async (req,res)=>{
//   console.log(req.query)
//   let {company,name,price,sort,select} = req.query
//   const obj = {}
//   if(company){
//     obj.company=company
//   }
//   if(name){
//     obj.name={ $regex: name, $options: 'i' }
//   }
//   if(price){
//     obj.price=price
//   }

//   let mydata =  producetModel.find(obj)
//   // console.log(mydata)
//   if(sort){
//     let sortfix = sort.split(',').join(' ')
//     mydata=mydata.sort(sortfix)
//   }

//   if(select){
//     let selectfix = select.split(',').join(' ')
//     mydata=mydata.select(selectfix)
//   }

// let {page,limit} = req.query

// let pg= Number(page) || 1
// let lim = Number(limit) || 3
// let sk = (pg-1)*lim

// mydata= mydata.skip(sk).limit(lim)
//   let data =await mydata.find(obj)
//   res.json({data})
//     // res.send('Home Route')
// }

// const TestRoute =(req,res)=>{
//   res.status(200).json({HEllo : 200 ,msg : 'Tets Route'})
//   // res.send('Test Route 11')
// }

// module.exports = {homeRoute,TestRoute}


// // mongodb+srv://<db_username>:<db_password>@cluster0.yf3zs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


// ************ Connect DB ***********

// const mongoose = require('mongoose');
// require("dotenv").config()
// // const uri = process.env.MONGODB_URI;
// // console.log("MongoDB URI:", process.env.MONGODB_URI);

// // Correct your URI here as well (ensure the credentials are properly set)
// // const uri = 'mongodb+srv://Tanmoy:Tanmoy@tanmoy.jm76m.mongodb.net/Tanmoy?retryWrites=true&w=majority&appName=Tanmoy';

// const uri = 'mongodb://localhost:27017/Api'

// // const uri = process.env.MONGODB_URI
// const connectDB = () => {
//   console.log("DB connected");
//   return mongoose.connect(uri)
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true, // Correct option here
//   // });
// };

// module.exports = connectDB;



// Product.deleteMany() ********** DONT sore Duplicate Val