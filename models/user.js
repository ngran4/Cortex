const mongoose = require('mongoose');

// Create your User Model
const userSchema = new mongoose.Schema({
  name: String,
  goggleId: {
    type: String,
    required: true
  },
  email: String,
  profile: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Profile',
  }
}, {
  timestamps:true
});

module.exports = mongoose.model('User', userSchema);

