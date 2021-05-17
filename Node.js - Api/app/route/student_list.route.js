module.exports = function(app) {
    const student_list = require('../controller/student_list.controller.js');
    
    // Retrieve all tuples in view
    app.get('/api/studentview', student_list.findAll)
}