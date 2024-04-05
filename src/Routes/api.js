const Express = require("express");
const { isAuth } = require("../Middlewares/isAuthenticate");
const router = Express.Router();

// define controllers path here
const { registerUser } = require("../Controllers/Api/Auth/registerController");
const {
  loginUser,
  logoutUser,
} = require("../Controllers/Api/Auth/loginController");
const {
  contactUserDetails,
} = require("../Controllers/Api/Contact/ContactController");

const {
  getAllBlogsWithPagination,
  getBlogById,
  getTrendingBlogs,
} = require("../Controllers/Api/Blog/BlogController");

const {
  getLatestTestimonials,
  getAllTestimonials,
} = require("../Controllers/Api/Testimonial/TestimonialController");

const {
  searchProperties,
  filterProperties,
  get_property_by_id,
  get_exclusive_listing,
  get_exclusive_listing_by_id,
} = require("../Controllers/Api/Property/PropertyController");

const {
  getMetaDataById,
  fetchAllMetaData,
} = require("../Controllers/Api/Meta/MetaDataController");

// example route
// router.get(url, conntrollerMethod);

// api routes here users side
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logoutUser);
router.post("/contact", contactUserDetails);
router.get("/blogs", getAllBlogsWithPagination);
router.get("/blog/trendings/", getTrendingBlogs);
router.get("/blog/:id", getBlogById);

router.get("/testimonials/latest", getLatestTestimonials);
router.get("/testimonials/all", getAllTestimonials);

router.get("/property/search", searchProperties);
router.get("/property/filter", filterProperties);
router.get("/property/:id", get_property_by_id);

router.get("/exclusive-listing", get_exclusive_listing);
router.get("/exclusive-listing/:id", get_exclusive_listing_by_id);


router.get("/meta-data/:pageName", getMetaDataById);
router.get("/meta-data/list/all", fetchAllMetaData);

module.exports = { apiRoutes: router };
