const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    categories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        default: null
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: null
    },
    published: {
        type: Boolean,
        default: false
    },
    authorBio: {
        type: String,
        default: null
    }, 
    created_at: {
        type: Date,
        default: Date.now
    }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
