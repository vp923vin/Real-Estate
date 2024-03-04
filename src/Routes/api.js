const Express = require('express');
const router = Express.Router();
// api routes here

// example route 
router.get('/', (req, res) => {
    return res.json({ message: 'API resource' });
});

module.exports = { apiRoutes: router };