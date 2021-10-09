const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
      type: String
    },
  description: {
      type: String
    },
  completed: {
      type: Boolean
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;