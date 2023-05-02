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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));