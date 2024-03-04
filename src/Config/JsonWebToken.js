require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;
const exipresIn = '1h';
module.exports = {
    secretKey,
    exipresIn
}