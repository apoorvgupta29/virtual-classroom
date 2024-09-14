// Unit.js
const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  name: { type: String, required: true },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

module.exports = mongoose.model('Unit', UnitSchema);
