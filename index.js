const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

const dbURI = 'mongodb+srv://group4:<password>@cluster0.abip4ba.mongodb.net/group4?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(result => console.log("Database connected"))
    .catch(error => console.log(error));

const Clothe = require('./models/clothe');

// Get all clothes
app.get('/clothes', async (req, res) => {
    try {
        const clothes = await Clothe.find();
        res.render('list-clothes', {
            title: 'Clothe List',
            clothes: clothes.map(clothe => clothe.toJSON())
        });
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not found"
        });
    }
});

// Get a single clothe by ID
app.get('/clothes/:id', async (req, res) => {
    try {
        const clothe = await Clothe.findById(req.params.id);
        res.render('show-clothe', {
            title: 'Clothe Details',
            clothe: clothe.toJSON()
        });
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not found"
        });
    }
});

// Display the form to add a new clothe
app.get('/clothes/new', (req, res) => {
    res.render('add-clothe');
});

// Create a new clothe
app.post('/clothes', async (req, res) => {
    try {
        const clothe = new Clothe(req.body);
        await clothe.save();

        res.redirect('/clothes');
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not added"
        });
    }
});

// Display the form to edit a clothe
app.get('/clothes/:id/edit', async (req, res) => {
    try {
        const clothe = await Clothe.findById(req.params.id);
        res.render('edit-clothe', {
            title: 'Edit Clothe',
            clothe: clothe.toJSON()
        });
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not found"
        });
    }
});

// Update a clothe
app.put('/clothes/:id', async (req, res) => {
    try {
        await Clothe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/clothes/${req.params.id}`);
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not updated"
        });
    }
});

// Delete a clothe
app.delete('/clothes/:id', async (req, res) => {
    try {
        await Clothe.findByIdAndDelete(req.params.id);
        res.redirect('/clothes');
    } catch (error) {
        res.status(404).json({
            msg: "Clothe not deleted"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening ${PORT}`));
