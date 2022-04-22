const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const  path  = require('path');
const cors = require('cors')




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.get('/chat', function(req, res) {
    res.render(path.join('chat.html'));
  });

require('./controllers/usersController')(app);


let port = (process.env.API_PORT || 3000);
console.log('API rodando na porta: '+port);

app.listen (port);