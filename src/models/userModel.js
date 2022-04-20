const mongoose = require('../database/db');

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    unique: true,
  },
  surname: {
    type: String
  },
  cpf: {
    type: String
  },
  phone: {
    type: String,
    default: "desconectado"
  }
});

const User = mongoose.model ('user', UserSchema);

module.exports = UserSchema;