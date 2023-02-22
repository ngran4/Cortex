const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema(
  {
  date: {
    type: Date,
    default: () => { return new Date() }
  },
  note: String
  },
  {
    timestamps: true,
  }
);

const habitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  streak: {
    type: Number, 
    default: 0
  },
  habitLog: [habitLogSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports =  mongoose.model('Habit', habitSchema);