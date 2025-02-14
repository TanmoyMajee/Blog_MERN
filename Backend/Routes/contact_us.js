require("dotenv").config()
const express = require('express')
const contact_usRoute = express.Router()
const nodemailer = require("nodemailer");

contact_usRoute.post('/contact_us',(req,res)=>{
  // console.log(req.body)
// Nodemailer Code
 let {name,email,message} = req.body
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name : name,
      address : email
    }, // sender address
    to: process.env.MAIL_USER, // list of receivers
    replyTo: email,
    subject: "MERN_BLOG_APP_CONTACT", // Subject line
    // text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);


  res.json("ok")
})

module.exports = contact_usRoute