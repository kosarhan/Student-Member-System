const db = require('../config/db.config.js');
const Department = db.department;

// Post a Department
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Department.create({
        "university_id": req.body.university_id,
        "name": req.body.name,
    }).then(department => {
        // Send created department to client
        res.json(department);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// FETCH All Departments
exports.findAll = (req, res) => {
    Department.findAll({ where: { is_deleted: false } }).then(department => {
        // Send All Departments to Client
        res.json(department.sort(function (c1, c2) { return c1.id - c2.id }));
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Find All Departments In One University
exports.findUniversityDepartment = (req, res) => {
    Department.findAll({ where: { university_id: req.params.university_id, is_deleted: false } }).then(department => {
        res.json(department.sort(function (c1, c2) { return c1.id - c2.id }));
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Update a Department
exports.update = (req, res) => {
    const id = req.body.id;
    Department.update(req.body, { where: { id: id } }).then(() => {
        res.status(200).json({ mgs: "Updated Successfully -> Department Id = " + id });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Delete a Department by Id
exports.delete = (req, res) => {
    const id = req.params.id;
    Department.update({ "is_deleted": true }, { where: { id: id } }).then(() => {
        res.status(200).json({ msg: 'Deleted Successfully -> Department Id = ' + id });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};