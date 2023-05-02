const { json } = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//Backup Mock Database
//Retrieve local JSON backup database 
//let items = require('C:\\Users\\Anton\\Documents\\GitHub\\WebFrameworkProject\\backupitem.json');
//console.log(items);
//In-code database
/*let items = [{id: 1,
        CloName: 'Trousers Male',
        CloImgLink: "PasteLinkHere",
        CloType: "Trousers",
        CloStyle: "CORDUROY TROUSERS",
        CloSizes: ["S", "M", "L", "XL", "XXL"],
        CloBrand: "Mango",
        CloMat: ["95% Cotton", "5% Wool"],
        CloColorsPrim: ["Black", "Dark Blue"],
        priceEuro: 19.55,
        onDiscount: false },
        {id: 2,
        CloName: "Jacket Male",
        CloImgLink: "PasteLinkHere",
        CloType: "Jacket",
        CloStyle: "Hooded Jacket",
        CloSizes: ["M", "L", "XL", "XXL"],
        CloBrand: "HUGO BOSS",
        CloMat: ["100% Polyester"],
        CloColorsPrim: ["Black Bottom and Beige Top"],
        priceEuro: 270,
        onDiscount: false },
        {id: 3,
        CloName: "HENDON CROMBIE WOOL JACKET Male",
        CloImgLink: "PasteLinkHere",
        CloType: "Jacket",
        CloStyle: "Crombie Jacket",
        CloSizes: ["M", "XL"],
        CloBrand: "BARBOUR",
        CloMat: ["100% Wool"],
        CloColorsPrim: ["Charcoal"],
        priceEuro: 179,
        onDiscount: true },
        {id: 4,
        CloName: "Duddin Short Sleeve Henley Male",
        CloImgLink: "PasteLinkHere",
        CloType: "Shirt",
        CloStyle: "HENLEY SHIRT",
        CloSizes: ["M", "L", "XL", "XXL", "3XL"],
        CloBrand: "Ted Baker London",
        CloMat: ["100% Cotton"],
        CloColorsPrim: ["Natural", "Navy", "White"],
        priceEuro: 95.04,
        onDiscount: false }]
*/
//End of Backup Database
app.use(express.static('public'));
//http://localhost:3000/
app.get('/', (req, res) => {
    //res.send("Testing");
    res.render('index',
        {
            pagetitle: "Welcome to our website!",
            desc: "Check out our products",
            items: items
        });
});

app.get('/admin', (req, res) => {
    res.render('admin',
        {
            pagetitle: "Admin page",
        });
});

app.get('/login', (req, res) => {
    res.render('login',
        {
            pagetitle: "Login page",
            desc : "Login",
        });
});

// end of anton pages
//Start of Harsh pages

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
app.listen(PORT, () => console.log(`Listening port ${PORT}`));