const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
require('dotenv').config();
const router = express.Router();
const path = require('path');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

const clothe = require('./controllers/clothe.js');


app.set('views', path.join(__dirname, '/views/'));
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    layoutsDir : __dirname + '/views/layouts/'
}));
app.set('view engine', 'handlebars');

app.use('/clothe', clothe);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));