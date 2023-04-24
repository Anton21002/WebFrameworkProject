const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));
//http://localhost:3000/
app.get('/', (req, res) => {
    //res.send("Testing");
    res.render('index',
        {
            pagetitle: "Welcome to our website!"
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));