const db = require('../config/db.config.js');

const Log = db.log;
const Student = db.student;

exports.create = (req, res) => {
    // Save to PostgreSQL database
    Log.create({
        "account_id": req.body.account_id,
        "log_message": req.body.log_message,
    }).then(log => {
        
        res.json(log);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
}

exports.list = (req, res) => {
    // Save to PostgreSQL database
    Log.findAll({
        order: [['id', 'DESC']],
        include: [{
            model: Student,
            attributes: ['first_name', 'last_name', 'verification_status']
        }]
    }).then(log => {
        res.json(log);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
}