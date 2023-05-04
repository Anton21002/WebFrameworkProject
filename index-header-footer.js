//const http = require('http');
//const fs = require('fs');
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
    pass: 'eliona260121O' /*actual password*/
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
      res.render("header-footer", {msg: 'You have been subscribed to our newsletter!'});
    }
  });
});


app.get('/', (req, res) => {
  res.render("header-footer")
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





/*
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './login.html';
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, function(error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');
*/