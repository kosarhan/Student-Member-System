const db = require('../config/db.config.js');
const Admin = db.admin;

// Find a Admin by Email
exports.login = (req, res) => {
	Admin.findOne({ where: { email: req.body.email,password: req.body.password } }).then(admin => {
		res.json(admin);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: "error", details: err });
	});
};
