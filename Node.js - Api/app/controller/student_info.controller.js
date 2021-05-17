const db = require('../config/db.config.js');

const StudentInfo = db.student_info;

// Post a Student Info
exports.create = (req, res) => {
    // Save to PostgreSQL database
    StudentInfo.create({
        "ssn": req.body.ssn,
        "account_id": req.body.account_id,
        "phone_number": req.body.phone_number,
        "university_id": req.body.university_id,
        "department_id": req.body.department_id,
        "class_no": req.body.class_no,
        "student_number": req.body.student_number,
        "mother_name": req.body.mother_name,
        "father_name": req.body.father_name,
        "birth_place": req.body.birth_place,
        "birthdate": req.body.birthdate,
        "city": req.body.city,
        "district": req.body.district,
        "cover_no": req.body.cover_no,
        "family_serial_no": req.body.family_serial_no,
        "serial_no": req.body.serial_no,
        "neighborhood": req.body.neighborhood,
        "blood_type": req.body.blood_type,
        "address": req.body.address,
    }).then(student_info => {
        // Send created Student Info to client
        res.json(student_info);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Get a Student Info By Account Id
exports.findByAccountId = (req, res) => {
    StudentInfo.findOne({ where: { account_id: req.params.id, is_deleted: false } }).then(studentInfo => {
        res.json(studentInfo);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

exports.updateInfo = (req, res) => {
    console.log(req);
    const id = req.body.id;
    StudentInfo.update(req.body,
        { where: { id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully ->  Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};