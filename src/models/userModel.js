const mongoose = require('../database/db');

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  surname: {
    type: String
  },
  cpf: {
    type: String
  },
  phone: {
    type: String,
  }
});

const User = mongoose.model ('user', UserSchema);

module.exports = User;