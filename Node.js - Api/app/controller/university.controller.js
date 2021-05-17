const db = require('../config/db.config.js');
const University = db.university;

// Post a University
exports.create = (req, res) => {
	// Save to PostgreSQL database
	University.create({
		"name": req.body.name,
		"city": req.body.city,
	}).then(university => {
		// Send created university to client
		res.json(university);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: "error", details: err });
	});
};

// FETCH All Universities
exports.findAll = (req, res) => {
	University.findAll({ where: { is_deleted: false } }).then(university => {
		// Send All Universities to Client
		res.json(university.sort(function (c1, c2) { return c1.id - c2.id }));
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: "error", details: err });
	});
};

// Find a University by Id
exports.findById = (req, res) => {
	University.findByPk(req.params.id).then(university => {
		res.json(university);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: "error", details: err });
	});
};

// Update a University
exports.update = (req, res) => {
	const id = req.body.id;
	University.update(req.body,
		{ where: { id: id } }).then(() => {
			res.status(200).json({ mgs: "Updated Successfully -> University Id = " + id });
		}).catch(err => {
			console.log(err);
			res.status(500).json({ msg: "error", details: err });
		});
};

// Delete a University by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	University.update({
		"is_deleted": true
	}, {
		where: { id: id }
	}).then(() => {
		res.status(200).json({ msg: 'Deleted Successfully -> University Id = ' + id });
	}).catch(err => {
		console.log(err);
		res.status(500).json({ msg: "error", details: err });
	});
};