module.exports = function(app) {
    const department = require('../controller/department.controller.js');

    // Create a new department
    app.post('/api/departments', department.create);

    // Retrieve all department
    app.get('/api/departments', department.findAll);

    // Retrieve all departments in one university
    app.get('/api/departments/:university_id', department.findUniversityDepartment);

    // Update a department with Id
    app.put('/api/departments', department.update);

    // Delete a department with Id
    app.put('/api/departments/delete/:id', department.delete);
}