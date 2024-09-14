const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
