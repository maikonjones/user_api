require('dotenv').config(require('dotenv').config({path: __dirname + '/./../.env'}))
const mongoose = require('mongoose');

let dbConnection =  process.env.DB_CONNECTION

mongoose.Promise = global.Promise;
mongoose.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
  console.log('Conectado ao DB ')
})
mongoose.connection.on('error', (error) => {
  console.error.bind(console.error, 'Connection Error:')
  mongoose.disconnect()
});

module.exports = mongoose;