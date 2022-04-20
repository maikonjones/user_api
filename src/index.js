const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

 
require('./controllers/usersController')(app);


let port = (process.env.API_PORT || 3001);
console.log('API rodando na porta: '+port);

module.exports = app.listen (port);