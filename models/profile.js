const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    habits: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Habits'}
    }, {
      timestamps: true
    });

module.exports = mongoose.model('Profile', profileSchema);