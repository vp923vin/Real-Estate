const Express = require('express');
const { isAuth } =  require('../Middlewares/isAuthenticate');
const router = Express.Router();

// define controllers path here
const { registerUser } = require('../Controllers/Api/Auth/registerController');
const { loginUser, logoutUser } = require('../Controllers/Api/Auth/loginController');
const { contactUserDetails } = require('../Controllers/Api/Contact/ContactController');






// example route 
// router.get(url, conntrollerMethod);

// api routes here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', isAuth, logoutUser);
router.get('/contact', contactUserDetails);


module.exports = { apiRoutes: router };