const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
 
require('./controllers/usersController')(app);


let port = (process.env.API_PORT || 3001);
console.log('API rodando na porta: '+port);

module.exports = app.listen (port);