const db = require('../config/db.config.js');

const StudentList = db.student_list;

// Get all tuples from view
exports.findAll = (req, res) => {
    StudentList.findAll().then(student => {
        res.json(student);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};