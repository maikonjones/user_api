const mongoose = require('../database/db');

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  surname: {
    type: String
  },
  password:{
    type:String,
  },
  cpf: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  }
});

const User = mongoose.model ('user', UserSchema);

module.exports = User;