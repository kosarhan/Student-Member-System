module.exports = function(app) {
    const admin = require('../controller/admin.controller.js');

    // Verify Admin
    app.post('/api/admin', admin.login);
}