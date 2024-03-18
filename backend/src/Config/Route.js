const { apiRoutes } = require('../Routes/api');
const { adminApiRoutes } = require('../Routes/admin');
const { loader_router } = require('../Routes/loaderRoutes');
const BodyParser = require('body-parser');
module.exports = (app) => {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.use('/api/admin', adminApiRoutes);
    app.use('/', loader_router);
};