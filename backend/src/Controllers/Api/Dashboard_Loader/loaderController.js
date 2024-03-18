const login_loader = async (req, res) => {
  res.render("pages/samples/login.ejs");
};

const error_500_loader = async (req, res) => {
  res.render("pages/samples/error-500.ejs");
};
const error_404_loader = async (req, res) => {
  res.render("pages/samples/error-404.ejs");
};

const dashbaord_loader = async (req, res) => {
  res.render("index.ejs");
};

const about_page_loader = async (req, res) => {
  res.render("pages/about/about.ejs");
};

const blog_page_loader = async (req, res) => {
  res.render("pages/blog/blog.ejs");
};

const create_blog_page_loader = async (req, res) => {
  res.render("pages/blog/createBlog.ejs");
};

const setting_page_loader = async (req, res) => {
  res.render("pages/setting/setting.ejs");
};

const meta_data_page_loader = async (req, res) => {
  res.render("pages/metadata/meta-data.ejs");
};

const enquiry_page_loader = async (req, res) => {
  res.render("pages/enquiry/enquiry.ejs");
};

const testimonial_page_loader = async (req, res) => {
  res.render("pages/testimonial/testimonial.ejs");
};

const testimonial_create_page_loader = async (req, res) => {
  res.render("pages/testimonial/testimonial-create.ejs");
};

const featuredlist_page_loader = async (req, res) => {
  res.render("pages/featuredlist/featuredlist.ejs");
};

const featuredlist_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/featuredlist-create.ejs");
};

const custom_property_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/custom-property-create.ejs");
};

const brokerage_page_loader = async (req, res) => {
  res.render("pages/featuredlist/brokerage.ejs");
};

const brokerage_create_page_loader = async (req, res) => {
  res.render("pages/featuredlist/brokerage-create.ejs");
};

const precondo_page_loader = async (req, res) => {
  res.render("pages/precondo/precondo.ejs");
};

const precondo_create_page_loader = async (req, res) => {
  res.render("pages/precondo/precondo-create.ejs");
};

module.exports = {
  dashbaord_loader,
  about_page_loader,
  blog_page_loader,
  create_blog_page_loader,
  setting_page_loader,
  meta_data_page_loader,
  enquiry_page_loader,
  testimonial_page_loader,
  testimonial_create_page_loader,
  login_loader,
  error_500_loader,
  error_404_loader,
  featuredlist_page_loader,
  featuredlist_create_page_loader,
  custom_property_create_page_loader,
  brokerage_page_loader,
  brokerage_create_page_loader,
  precondo_page_loader,
  precondo_create_page_loader,
};
