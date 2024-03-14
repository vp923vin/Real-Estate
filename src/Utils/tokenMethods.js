const jwt = require('jsonwebtoken');
const { secretKey, exipresIn } = require('../Config/JsonWebToken');
// const generateToken = (payload) => {
//     return jwt.sign(payload, secretKey, { expiresIn: exipresIn });
// };

const generateToken = (payload) => {
    if (typeof payload !== 'object' || Array.isArray(payload)) {
        throw new Error('Payload must be a plain object');
    }
    return jwt.sign(payload, secretKey, { expiresIn: exipresIn });
};


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, payload: decoded };
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return { valid: false, error: error.message };
    }
};
module.exports = {
    generateToken,
    verifyToken
}