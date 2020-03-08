var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer')
var User=require('../models/test')
/* GET home page. */
router.get('/', function(req, res) {
  res.render('form', { title: 'Express' });
});

router.post('/add',(req,res)=>{
  const name=req.body.name
  const email=req.body.email
  const phone=req.body.phone

  new User({
    Name:name,
    email:email,
    phone:phone
  }).save((err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      res.redirect('form1')
    }
  })
  console.log("working")
})
 
router.get('/form1', function(req, res) {
  res.render('form1', { title: 'Express' });
});
router.post('/feedback', (req, res) => {
  const output = `
    <p>You have a  New Enquiry</p>
    <h3>Your OTP is</h3>
    <ul>  
        <li>otp: ${req.body.otp}</li>
        <li>click to verify<a href="http://localhost:3000/form1">test</a></li>
    </ul>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'muskaanlagwal123@gmail.com', // generated ethereal user
        pass: 'EXPRESSIONS1998'  // generated ethereal password
    },
    // tls:{
    //   rejectUnauthorized:false
    // }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'muskaanlagwal123@gmail.com', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'New Enquiry', // Subject line
      text: 'From Brandzia Website', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);  
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.send(`<body style="background-color:black;
        overflow:hidden;">
        <div style="position:absolute;
        font-family: 'Montserrat';
        width : 100%;
         height: 5rem;
         text-align: center;
          font-size: 2rem;
          top: 50%;
          color:silver;
          transform: translateY(-50%);
          ">
          Thank You For The Feedback. We will get in touch with you soon </div></body>`);
  });
});
module.exports = router;