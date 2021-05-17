const db = require('../config/db.config.js');

const Application = db.application;
const Student = db.student;

// Post application
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Application.create({
        "account_id": req.body.account_id,
    }).then(application => {
        // Send created Student Info to client
        res.json(application);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
}

// Applications By Id
exports.findAll = (req, res) => {
    Application.findAll({
        attributes: ['id', 'createdAt'],
        include: [{
            model: Student,
            attributes: ['id', 'first_name', 'last_name', 'verification_status'],
            where: { verification_status: false }
        }]
    }).then(application => {
        // Send All Applications to Client
        res.json(application.sort(function (c1, c2) { return c1.id - c2.id }));
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Application Count
exports.count = (req, res) => {
    Application.count({
        include: [{
            model: Student,
            where: { verification_status: false }
        }]
    }).then(c => {
        res.json(c)
    })
}

