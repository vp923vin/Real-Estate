const UserModel = require('../../../Models/UserModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User already exists'
            });
        }

        const newUser = new UserModel({
            name,
            email,
            phone,
            password
        });

        await newUser.save();
        return res.status(201).json({ 
            status: true,
            message: 'User registered successfully' 
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ 
            status: false,
            message: 'Internal Server Error' 
        });
    }
};

module.exports = {
    registerUser,
};
