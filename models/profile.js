const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  habits: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habit'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Profile', profileSchema);