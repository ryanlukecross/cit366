const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    username: { type: String, required: true },
    passcode: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    total_dollars_earned: { type: Number, required: false },
    image_url: { type: String, required: true },
    game_piece_url: { type: String, required: true }
});

module.exports = mongoose.model('Player', playerSchema);