const UserModel = require('../../../Models/UserModel');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../../../Utils/tokenMethods');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user = await UserModel.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                message: 'Invalid Credentials'
            });
        }

        const accessToken = generateToken(user);

        return res.status(200).json({
            status: true,
            message: 'login successful',
            token: accessToken
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error'
        });
    }
}


const logoutUser = (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'Logout successful'
    });
};

module.exports = {
    loginUser,
    logoutUser,
}