const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const homeController = require('./controllers/home');

var app = express();



app.get('/', homeController.home);

const configureApp = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
}


configureApp(app);

module.exports = app;
