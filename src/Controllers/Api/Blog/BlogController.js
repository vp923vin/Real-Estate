const Category = require("../../../Models/BlogCategoryModel");
const BlogPost = require("../../../Models/BlogModel");
const Testimonial = require("../../../Models/TestimonialModel");
const Property = require("../../../Models/PropertyModel");
const Contact = require("../../../Models/ContactModel");

const upload = require("../../../Utils/ImageUpload");
const moment = require("moment");

// admin  methods
const createBlogPost = async (req, res) => {
  try {
    const {
      title,
      content,
      author,
      categories,
      tags,
      likes,
      views,
      slug,
      published,
      authorBio,
    } = req.body;
    const { mainImage, multiImages } = req.files;
    const mainImageFilename = mainImage[0].filename;
    const multiImagesFilenames =
      multiImages != null || multiImages != undefined
        ? multiImages.map((image) => image.filename)
        : [];
    const newPost = new BlogPost({
      title,
      content,
      author,
      categories,
      tags,
      likes,
      views,
      slug,
      published,
      authorBio,
      mainImage: mainImageFilename,
      multiImages: multiImagesFilenames,
    });
    newPost
      .save()
      .then((savedPost) => {
        return res.status(201).json({
          status: "success",
          message: "Blog post saved successfully",
          data: savedPost,
        });
      })
      .catch((error) => {
        console.error("Error saving blog post:", error);
        return res.status(500).json({
          status: false,
          message: "Internal server error",
        });
      });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// const editBlogPost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content, author, categories, tags, likes, views, image, slug, published, authorBio } = req.body;
//         const { mainImage, multiImages } = req.files;
//         const mainImageFilename = mainImage[0].filename;
//         const multiImagesFilenames = (multiImages != null || multiImages != undefined) ? multiImages.map(image => image.filename) : [];

//         const existingPost = await BlogPost.findById(id);

//         if (!existingPost) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Blog post not found'
//             });
//         }

//         existingPost.title = title;
//         existingPost.content = content;
//         existingPost.author = author;
//         existingPost.categories = categories;
//         existingPost.tags = tags;
//         existingPost.likes = likes;
//         existingPost.views = views;
//         existingPost.mainImage = mainImageFilename;
//         existingPost.multiImages = multiImagesFilenames;
//         existingPost.slug = slug;
//         existingPost.published = published;
//         existingPost.authorBio = authorBio;

//         const updatedPost = await existingPost.save();

//         // Send response with the updated post
//         return res.status(200).json({
//             status: true,
//             message: 'Blog post updated successfully',
//             data: updatedPost
//         });
//     } catch (error) {
//         console.error('Error editing blog post:', error);
//         return res.status(500).json({
//             status: false,
//             message: 'Internal server error'
//         });
//     }
// };

const editBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const { mainImage, multiImages } = req.files || {}; // Set default values if req.files is undefined
    const mainImageFilename = mainImage ? mainImage[0].filename : undefined;
    const multiImagesFilenames = multiImages
      ? multiImages.map((image) => image.filename)
      : [];

    // Find the existing post
    const existingPost = await BlogPost.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        status: false,
        message: "Blog post not found",
      });
    }

    // Update only the fields provided from the frontend
    for (const field in updateFields) {
      if (field === "mainImage") {
        existingPost.mainImage = mainImageFilename;
      } else if (field === "multiImages") {
        existingPost.multiImages = multiImagesFilenames;
      } else if (existingPost[field] !== undefined) {
        existingPost[field] = updateFields[field];
      }
    }

    // Save the updated post
    const updatedPost = await existingPost.save();

    // Send response with the updated post
    return res.status(200).json({
      status: true,
      message: "Blog post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error editing blog post:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        status: false,
        message: "Blog post not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteMultipleBlogPosts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        status: false,
        message: "Invalid request format",
      });
    }

    const deletedPosts = await BlogPost.deleteMany({ _id: { $in: ids } });

    if (deletedPosts.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No blog posts found with the provided IDs",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Blog posts deleted successfully",
      data: deletedPosts,
    });
  } catch (error) {
    console.error("Error deleting blog posts:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().populate({
      path: "categories",
      select: "name",
    });

    return res.status(200).json({
      status: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let count = 1;

    // Check if the category name already exists
    let existingCategory = await Category.findOne({ name });

    // If the category name already exists, append a number to it
    while (existingCategory) {
      name = `${req.body.name}(${count})`;
      count++;
      existingCategory = await Category.findOne({ name });
    }

    // Create the category with the modified name
    const category = new Category({ name });
    await category.save();

    res.status(201).json({
      status: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        status: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const allCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({
      status: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        status: false,
        message: "Invalid request format",
      });
    }

    const deletedCategories = await Category.deleteMany({ _id: { $in: ids } });

    if (deletedCategories.deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: "No categories found with the provided IDs",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Categories deleted successfully",
      data: deletedCategories,
    });
  } catch (error) {
    console.error("Error deleting categories:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// user methods
const getAllBlogsWithPagination = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const startIndex = (page - 1) * limit;

    const blogs = await BlogPost.find()
      .populate({
        path: "categories",
        select: "name -_id",
      })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      status: true,
      message: "Blogs retrieved successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id).populate({
      path: "categories",
      select: "name -_id",
    });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog post not found",
      });
    }

    blog.views += 1;
    await blog.save();

    return res.status(200).json({
      status: true,
      message: "Blog post retrieved successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const getTrendingBlogs = async (req, res) => {
  const oneWeekAgo = moment().subtract(1, "week").toDate();
  const currentDate = new Date();
  console.log(oneWeekAgo, currentDate);
  try {
    const trendingBlogs = await BlogPost.find({
      views: { $gt: 0 },
      created_at: { $gte: oneWeekAgo, $lte: currentDate },
    })
      .populate({
        path: "categories",
        select: "name -_id",
      })
      .sort({ views: -1 })
      .limit(10);

    res.status(200).json({
      status: true,
      message: "Trending blogs retrieved successfully",
      data: trendingBlogs,
    });
  } catch (error) {
    console.error("Error fetching trending blogs:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

const dashboard_display_number = async (req, res) => {
  try {
    // Retrieve data from all models
    const blogPosts = await BlogPost.find();
    const testimonials = await Testimonial.find();
    const properties = await Property.find();
    const contacts = await Contact.find();

    // Calculate counts
    const dataCounts = {
      blogPostCount: blogPosts.length,
      testimonialCount: testimonials.length,
      propertyCount: properties.length,
      contactCount: contacts.length,
    };

    // Return response with data counts
    res.status(200).json(dataCounts);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBlogPost,
  editBlogPost,
  deleteBlogPost,
  deleteMultipleBlogPosts,
  getAllBlogs,
  getAllBlogsWithPagination,
  getBlogById,
  getTrendingBlogs,
  createCategory,
  updateCategory,
  deleteCategory,
  allCategory,
  deleteCategories,
  dashboard_display_number,
};
