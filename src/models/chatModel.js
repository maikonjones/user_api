const mongoose = require('../database/db');

const ChatSchema = new mongoose.Schema({
  author:{
    type: String,
  },
  message: {
    type: String
  },
  created_at:{
    type: Date,
    default: Date.now()
  }
});

const Chat = mongoose.model ('chat', ChatSchema);

module.exports = Chat;