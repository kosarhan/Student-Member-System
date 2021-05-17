module.exports = function(app) {
    const student_info = require('../controller/student_info.controller.js');

    // Post Student Info
    app.post('/api/studentinfo', student_info.create);

    // Get Student Info
    app.get('/api/studentinfo/:id',student_info.findByAccountId);

    // Update Student Info
    app.put('/api/studentinfo/update', student_info.updateInfo);

}