const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require("express")
const app = express()
const hbs = require("hbs")
const collection = require("./mongodb");
const { error } = require('console');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const tempelatePath = path.join(__dirname, '../views')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
            res.render("header-footer", { msg: 'You have been subscribed to our newsletter!' });
        }
    });
});


app.get('/', (req, res) => {
    res.render("header-footer")
});
const clothe = require('./controllers/clothe.js');


/*app.set('views', path.join(__dirname, '/views/'));
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'handlebars');

app.use('/clothe', clothe);
*/
app.get("/", (req, res) => {
    res.render("home")
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    try {
        const check = await collection.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })

        if (check) {
            if (check.username === req.body.username) {
                res.render("signup", { msg: "Username is already in use!" })
            }
            else if (check.email === req.body.email) {
                res.render("signup", { msg: "Email is already in use!" })
            }
        }
        else {
            const data = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            await collection.insertMany([data])

            res.redirect("/login")
        }
    }
    catch (error) {
        res.render("signup", { msg: "Please double check your information!" })
    }
})


app.post("/login", async (req, res) => {

    try {
        const check = await collection.findOne({ $or: [{ email: req.body.email }, { password: req.body.password }] })

        if (check.email === req.body.email) {
            if (check.password === req.body.password) {
                res.redirect("/home")
            }
            else {
                res.render("login", { msg: "Wrong Password!" })
            }
        }
        else {
            res.render("login", { msg: "Wrong email!" })
        }
    }
    catch (error) {
        res.render("login", { msg: "Please check your information!" })
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));