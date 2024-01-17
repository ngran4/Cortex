const mongoose = require('mongoose');

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

