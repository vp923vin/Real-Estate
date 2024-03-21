const { apiRoutes } = require('../Routes/api');
const { adminApiRoutes } = require('../Routes/admin');

const BodyParser = require('body-parser');
module.exports = (app) => {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.use('/api/admin', adminApiRoutes);
};