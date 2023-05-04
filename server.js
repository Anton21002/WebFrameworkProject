const path = require('path');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const hbs = require("hbs")
const app = express();
const port = 3000;

const tempelatePath = path.join(__dirname, '../views')

app.set("view engine", "hbs")
app.set("views", tempelatePath)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'orgesgashi41@outlook.com',
    pass: '<password>' /*actual password*/
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/send', (req, res) => {
  const email = req.body.email;
  const mailOptions = {
    from: 'orgesgashi41@outlook.com',
    to: email,
    subject: 'Your subscription to StreetWear',
    text: 'Welcome to our newsletter! Thank you for subscribing to our NewsLetter! Now you will be up to date with everything from now on :)'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error: Something went wrong. Please try again later.');
    } else {
      console.log('Email sent: ' + info.response);
      res.render("login", {msg: 'You have been subscribed to our newsletter!'});
    }
  });
});


app.get('/', (req, res) => {
  res.render("login")
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
