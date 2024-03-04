const jwt = require('jsonwebtoken');
const { secretKey, exipresIn } = require('../Config/JsonWebToken');
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: exipresIn });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
}