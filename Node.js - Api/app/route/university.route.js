module.exports = function(app) {
    const university = require('../controller/university.controller.js');
 
    // Create a new university
    app.post('/api/universities', university.create);
 
    // Retrieve all university
    app.get('/api/universities', university.findAll);
 
    // Retrieve a single university by Id
    app.get('/api/universities/:id', university.findById);
 
    // Update a university with Id
    app.put('/api/universities', university.update);
 
    // Delete a university with Id
    app.put('/api/universities/:id', university.delete);
}