module.exports = function(app) {
    const log = require('../controller/log.controller.js');

    // Post Log
    app.post('/api/log', log.create);

    // Get Log
    app.get('/api/log', log.list);
}