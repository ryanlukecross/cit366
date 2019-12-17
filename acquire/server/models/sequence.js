const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxPlayerId: { type: Number, required: true },
    maxid: { type: Number, required: true }
})

module.exports = mongoose.model('Sequence', sequenceSchema);