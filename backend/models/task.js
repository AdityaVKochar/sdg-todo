const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dueAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Task', taskSchema);
