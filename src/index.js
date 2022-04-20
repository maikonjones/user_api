const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());
 
require('./controllers/usersController')(app);


let port = (process.env.API_PORT || 3333);
console.log('API rodando na porta: '+port);

module.exports = app.listen (port);