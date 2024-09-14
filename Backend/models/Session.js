// Session.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  name: { type: String, required: true },
  materials: [{ type: String }], // Store file URLs or MongoDB GridFS IDs
  discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }]
});

module.exports = mongoose.model('Session', SessionSchema);
