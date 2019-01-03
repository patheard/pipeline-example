/**
 * Controller for all service related actions
 */
const { render } = require('server/reply');
const service = require('../models/service');

// Search for services
exports.search = async (context) => {
    return render('service-search-results.hbs', { services: service.find(context.query.name) });
};