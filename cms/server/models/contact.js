const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    _id: { type: String, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    imageUrl: { type: String, required: false }
    //  group: { type: Contact[]};
});

module.exports = mongoose.model('Contact', contactSchema);