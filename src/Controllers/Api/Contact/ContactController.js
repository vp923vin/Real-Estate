const Contact = require('../../../Models/ContactModel');
const contactUserDetails = async (req, res) => {
    try {
        const { name, email, phone, subject, description } = req.body;
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            description
        });

        await newContact.save();
        res.status(201).json({ message: 'Contact details submitted successfully' });
    } catch (error) {
        console.error('Error in submitting contact details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { contactUserDetails };
