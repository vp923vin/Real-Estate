const Testimonial = require('../../../Models/TestimonialModel');

const addTestimonial = async (req, res) => {
    try {
        const { name, message, rating } = req.body;
        const testimonial = new Testimonial({ name, message, rating });
        await testimonial.save();
        return res.status(201).json({
            success: true,
            message: 'Testimonial added successfully',
            data: testimonial
        });
    } catch (error) {
        console.error('Error adding testimonial:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const editTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message, rating } = req.body;
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, { name, message, rating }, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Testimonial updated successfully',
            data: updatedTestimonial
        });
    } catch (error) {
        console.error('Error editing testimonial:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
        if (!deletedTestimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const deleteMultipleTestimonials = async (req, res) => {
    try {
        const { ids } = req.body;
        const deletedTestimonials = await Testimonial.deleteMany({ _id: { $in: ids } });
        if (deletedTestimonials.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'No testimonials found with the provided IDs'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Testimonials deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting multiple testimonials:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getLatestTestimonials = async (req, res) => {
    try {
        const latestTestimonials = await Testimonial.find().sort({ createdAt: -1 }).limit(10);
        return res.status(200).json({
            success: true,
            message: 'Latest 10 testimonials retrieved successfully',
            data: latestTestimonials
        });
    } catch (error) {
        console.error('Error fetching latest testimonials:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({
            success: true,
            message: 'All testimonials retrieved successfully',
            data: testimonials
        });
    } catch (error) {
        console.error('Error fetching all testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    addTestimonial,
    editTestimonial,
    deleteTestimonial,
    deleteMultipleTestimonials,
    getLatestTestimonials,
    getAllTestimonials
};
