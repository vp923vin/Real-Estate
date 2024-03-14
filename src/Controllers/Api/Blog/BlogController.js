const Category = require('../../../Models/BlogCategoryModel');
const BlogPost = require('../../../Models/BlogModel');

// admin  methods
const createBlogPost = async (req, res) => {
    try {
        const { title, content, author, categories, tags, likes, views, image, slug, published, authorBio } = req.body;

        const newPost = new BlogPost({
            title,
            content,
            author,
            categories,
            tags,
            likes,
            views,
            image,
            slug,
            published,
            authorBio
        });

        const savedPost = await newPost.save();
        console.log('Blog post created:', savedPost);
        return res.status(201).json({
            status: 'success',
            message: "Blog post saved successfully",
            data: savedPost
        }); 
    } catch (error) {
        console.error('Error creating blog post:', error);
        return res.status(500).json({ 
            status: false,
            message: 'Internal server error' 
        }); 
    }
};

const editBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, categories, tags, likes, views, image, slug, published, authorBio } = req.body;

        const existingPost = await BlogPost.findById(id);

        if (!existingPost) {
            return res.status(404).json({ 
                status: false, 
                message: 'Blog post not found' 
            });
        }

        existingPost.title = title;
        existingPost.content = content;
        existingPost.author = author;
        existingPost.categories = categories;
        existingPost.tags = tags;
        existingPost.likes = likes;
        existingPost.views = views;
        existingPost.image = image;
        existingPost.slug = slug;
        existingPost.published = published;
        existingPost.authorBio = authorBio;

        const updatedPost = await existingPost.save();
        console.log('Blog post updated:', updatedPost);
        
        // Send response with the updated post
        return res.status(200).json({
            status: true,
            message: 'Blog post updated successfully',
            data: updatedPost
        });
    } catch (error) {
        console.error('Error editing blog post:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
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
                message: 'Blog post not found' 
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Blog post deleted successfully',
            data: deletedPost
        });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
        });
    }
};

const deleteMultipleBlogPosts = async (req, res) => {
    try {
        const { ids } = req.body; 
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid request format' 
            });
        }

        const deletedPosts = await BlogPost.deleteMany({ _id: { $in: ids } });

        if (deletedPosts.deletedCount === 0) {
            return res.status(404).json({ 
                status: false, 
                message: 'No blog posts found with the provided IDs' 
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Blog posts deleted successfully',
            data: deletedPosts
        });
    } catch (error) {
        console.error('Error deleting blog posts:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
        });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find();

        return res.status(200).json({
            status: true,
            message: 'Blogs retrieved successfully',
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
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
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            status: true,
            message: 'Blogs retrieved successfully',
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogPost.findById(id);

        if (!blog) {
            return res.status(404).json({
                status: false,
                message: 'Blog post not found'
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Blog post retrieved successfully',
            data: blog
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error' 
        });
    }
};


module.exports = { 
    createBlogPost, 
    editBlogPost, 
    deleteBlogPost, 
    deleteMultipleBlogPosts, 
    getAllBlogs, 
    getAllBlogsWithPagination,
    getBlogById
};

