const { verifyToken } = require('../Utils/tokenMethods');


const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorized Request'
        });
    }

    const token = authHeader.split(' ')[1];
    const tokenValidity = verifyToken(token);
    if(tokenValidity.valid !== true){
        return res.status(401).json({
            status: false,
            message: 'Unauthorized Request'
        });
    }
    req.user = tokenValidity.payload;
    next();
};


module.exports = { isAuth };