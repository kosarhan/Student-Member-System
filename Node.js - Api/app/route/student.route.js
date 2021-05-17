module.exports = function(app) {
    const student = require('../controller/student.controller.js');


    // Retrieve all students verified
    app.get('/api/student', student.findAll);

    // Retrieve a student by id
    app.get('/api/student/:id', student.findById);

    // Verify Student
    app.post('/api/studentlogin', student.login);

    // Add a New Student
    app.post('/api/studentlogin/add', student.addStudent);

    //update student
    app.put('/api/student', student.updateStudent);

    // Delete a student
    app.put('/api/student/:id',student.delete);
    
    // Verify student by Admin
    app.put('/api/studentinfo',student.verify);
}