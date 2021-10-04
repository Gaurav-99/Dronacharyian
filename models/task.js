const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;