const Express = require('express');
const router = Express.Router();

// define controllers
const { createBlogPost, editBlogPost, deleteBlogPost, deleteMultipleBlogPosts, getAllBlogs } = require('../Controllers/Api/Blog/BlogController');


// define routes
router.get('/blog/all-blog-posts', getAllBlogs);
router.post('/blog/create', createBlogPost);
router.put('/blog/update/:id', editBlogPost);
router.delete('/blog/delete/:id', deleteBlogPost);
router.post('/blog/delete/multiple', deleteMultipleBlogPosts);


module.exports = { adminApiRoutes: router };