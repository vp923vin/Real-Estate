const Express = require('express');
const router = Express.Router();

// define controllers
const { 
    createBlogPost, 
    editBlogPost, 
    deleteBlogPost, 
    deleteMultipleBlogPosts, 
    getAllBlogs, 
    createCategory,
    updateCategory,
    deleteCategory,
    allCategory,
    deleteCategories
} = require('../Controllers/Api/Blog/BlogController');


// define routes
router.get('/blog/all-blog-posts', getAllBlogs);
router.post('/blog/create', createBlogPost);
router.put('/blog/update/:id', editBlogPost);
router.delete('/blog/delete/:id', deleteBlogPost);
router.post('/blog/delete/multiple', deleteMultipleBlogPosts);
router.post('/blog/category/create', createCategory);
router.put('/blog/category/update/:id', updateCategory);
router.delete('/blog/category/delete/:id', deleteCategory);
router.post('/blog/category/delete-multiple', deleteCategories);
router.get('/blog/category/list-all', allCategory);


module.exports = { adminApiRoutes: router };