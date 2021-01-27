const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const homeController = require('./controllers/home');
const validateController = require('./controllers/validate_rule');
const utils = require('./utils/utils');

var app = express();

const configureApp = (app) => {
    // app.use(cors());
    app.use(bodyParser.json());
    app.use(utils.checkBody);
    
    app.get('/', homeController.home);
    app.post('/validate-rule', validateController.validate);
}


configureApp(app);

module.exports = app;
