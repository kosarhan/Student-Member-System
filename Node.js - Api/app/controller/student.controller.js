const db = require('../config/db.config.js');

const Student = db.student;

// Find a Student by Email
exports.login = (req, res) => {
    Student.findOne({ where: { email: req.body.email, password: req.body.password, is_deleted:false } }).then(student => {
        res.json(student);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Find a Student by Id
exports.findById = (req, res) => {
    Student.findByPk(req.params.id).then(student => {
        res.json(student);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// FETCH All Students
exports.findAll = (req, res) => {
    Student.findAll({
        where: {
            verification_status: true,
            is_deleted: false
        }
    }).then(student => {
        // Send All students to Client
        res.json(student.sort(function (c1, c2) { return c1.id - c2.id }));
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Post a Student
exports.addStudent = (req, res) => {
    // Save to PostgreSQL database
    Student.create({
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
    }).then(student => {
        // Send created student to client
        res.json(student);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Update Student By Id
exports.updateStudent = (req, res) => {
    const id = req.body.id;
    Student.update(req.body,
        { where: { id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully -> Student Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};

// Verify Student By Admin
exports.verify = (req, res) => {
    const id = req.body.id;
    Student.update(req.body,
        { where: { id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully -> Student Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};

// Delete a student
exports.delete = (req, res) => {
    const id = req.params.id;
    Student.update({ "is_deleted": true }, {
        where: { id: id }
    }).then(() => {
        res.status(200).json({ mgs: "Updated Successfully -> Student Id = " + id });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
}