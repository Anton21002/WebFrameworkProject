const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express ();

app.use(express.urlencoded({extended: false}));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const dbURI = 'mongodb+srv://group4:<password>@cluster0.abip4ba.mongodb.net/group4?retryWrites=true&w=majority'

mongoose.connect(dbURI)
.then(result => console.log("Database connected"))
.catch(error => console.log(error));


// testing new clothe

const Clothe = require('./models/Clothe');

app.get('/clothes', async (req,res) => {

    const clothes = await Clothe.find();
    //console.log(clothes);
    //res.send("Testing");
    res.render('list-clothes', {
        title : 'Clothe List',
        clothes : clothes.map(clothe => clothe.toJSON())
    })

});

// Admin can add a cloth using an HTML form
app.get('/add-clothe', (req,res) => {
    res.render('add-clothe');
}) 

app.post('/clothes', async (req, res) => {
    try {
        const clothe = new Clothe(req.body);
        await clothe.save();
        
        res.redirect('/clothes');
    }
    catch (error)
    {
        res.status(404).json({
            msg: "Clothe not added"
        })
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening ${PORT}`));
