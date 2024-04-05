const Express = require("express");
const router = Express.Router();
const upload = require("../Utils/ImageUpload");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadSingle = multer({ storage: storage });
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
  deleteCategories,
  dashboard_display_number,
} = require("../Controllers/Api/Blog/BlogController");

const {
  getAllContacts,
  deleteContactById,
  deleteMultipleContacts,
  contactUserByEmail,
} = require("../../src/Controllers/Api/Contact/ContactController");

const {
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
  deleteMultipleTestimonials,
} = require("../../src/Controllers/Api/Testimonial/TestimonialController");

const {
  fetchPropertyDetails,
  getAllProperties,
  getPropertyWithPagination,
  deleteProperty,
  post_exclusive_listing,
  deleteExlusive,
} = require("../Controllers/Api/Property/PropertyController");
const {
  addSampleMetaData,
  updateMetaDataById,
} = require("../Controllers/Api/Meta/MetaDataController");
const {
  getSettingsById,
  updateSettingsById,
  addSettings,
} = require("../Controllers/Api/Settings/SettingsController");

// define routes
router.get("/blog/all-blog-posts", getAllBlogs);
router.post(
  "/blog/create",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "multiImages", maxCount: 10 },
  ]),
  createBlogPost
);
router.put(
  "/blog/update/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "multiImages", maxCount: 10 },
  ]),
  editBlogPost
);
router.delete("/blog/delete/:id", deleteBlogPost);
router.post("/blog/delete/multiple", deleteMultipleBlogPosts);
router.post("/blog/category/create", createCategory);
router.put("/blog/category/update/:id", updateCategory);
router.delete("/blog/category/delete/:id", deleteCategory);
router.post("/blog/category/delete/multiple", deleteCategories);
router.get("/blog/category/list-all", allCategory);

router.get("/contact/list-all", getAllContacts);
router.delete("/contact/delete/:id", deleteContactById);
router.post("/contact/delete/multiple", deleteMultipleContacts);
router.get("/contact/user/email/:id", contactUserByEmail);

router.post("/testimonials/create", addTestimonial);
router.put("/testimonials/update/:id", editTestimonial);
router.delete("/testimonials/delete/:id", deleteTestimonial);
router.post("/testimonials/delete/multiple", deleteMultipleTestimonials);

// dummy api data routes

router.get("/property/save", fetchPropertyDetails);
router.get("/property/list/all", getAllProperties);
router.get("/property/with/pagination", getPropertyWithPagination);
router.delete("/property/delete/:id", deleteProperty);

router.post(
  "/exclusive/create",
  uploadSingle.single("exclusive_image"),
  post_exclusive_listing
);

router.delete("/exclusive/delete/:id", deleteExlusive);

router.get("/meta-data/", addSampleMetaData);
router.post("/meta-data/update/:id", updateMetaDataById);

router.get("/settings/:id", getSettingsById);
router.put("/settings/update/:id", updateSettingsById);
router.post("/settings/add", addSettings);
//Get dashboard information
router.get("/dashboard/details", dashboard_display_number);

module.exports = { adminApiRoutes: router };
