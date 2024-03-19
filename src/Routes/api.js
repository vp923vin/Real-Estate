const Express = require('express');
const { isAuth } =  require('../Middlewares/isAuthenticate');
const router = Express.Router();

// define controllers path here
const { registerUser } = require('../Controllers/Api/Auth/registerController');
const { loginUser, logoutUser } = require('../Controllers/Api/Auth/loginController');
const { contactUserDetails } = require('../Controllers/Api/Contact/ContactController');
const { getAllBlogsWithPagination, getBlogById, getTrendingBlogs } = require('../Controllers/Api/Blog/BlogController');
const { getLatestTestimonials, getAllTestimonials } = require('../Controllers/Api/Testimonial/TestimonialController');




// example route 
// router.get(url, conntrollerMethod);

// api routes here users side
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isAuth, logoutUser);
router.post('/contact', contactUserDetails);
router.get('/blogs', getAllBlogsWithPagination);
router.get('/blog/trendings/', getTrendingBlogs);
router.get('/blog/:id', getBlogById);

router.get('/testimonials/latest', getLatestTestimonials);
router.get('/testimonials/all', getAllTestimonials);

module.exports = { apiRoutes: router };