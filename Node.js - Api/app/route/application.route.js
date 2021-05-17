module.exports = function(app) {
    const application = require('../controller/application.controller.js');

    // Post Student Info
    app.post('/api/application', application.create);

    app.get('/api/application', application.findAll);

    app.get('/api/application/count', application.count);

}