const mongoose = require('mongoose');

// Schema is just a blue-print
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);