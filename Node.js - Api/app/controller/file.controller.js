const db = require('../config/db.config.js');

const File = db.file;


// Post a Student File
exports.create = (req, res) => {
    // Save to PostgreSQL database
    File.create({
        "account_id": req.params.id,
        "registration_form": req.files[2].path,
        "passport_photo": req.files[0].path,
        "student_certificate": req.files[1].path,
    }).then(file => {
        // Send created uploaded file to client
        res.json(file);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};

// Get Students File
exports.getFiles = (req, res) => {
    File.findOne({ where: { account_id: req.params.id, is_deleted: false } }).then(files => {
        res.json(files);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "error", details: err });
    });
};


// Update Files
exports.updatePhoto = (req, res) => {
    const id = req.params.id;
    File.update({ passport_photo: req.files[0].path },
        { where: { account_id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully -> Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};

exports.updateCertificate = (req, res) => {
    const id = req.params.id;
    File.update({ student_certificate: req.files[0].path },
        { where: { account_id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully -> Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};

exports.updateForm = (req, res) => {
    const id = req.params.id;
    File.update({ registration_form: req.files[0].path },
        { where: { account_id: id } }).then(() => {
            res.status(200).json({ mgs: "Updated Successfully -> Id = " + id });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "error", details: err });
        });
};