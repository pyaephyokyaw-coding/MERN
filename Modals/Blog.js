const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    intro: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
})

const blog = mongoose.model('Blog', blogSchema);

module.exports = blog;