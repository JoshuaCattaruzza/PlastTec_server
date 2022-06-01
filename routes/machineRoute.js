const express = require('express');
const router = express.Router();
const machineModel = require('../models/machineModel');


router.post('/create', (req, res) => {
	
	const Machine = {
        type: req.body.type,
		name: req.body.name,
		description: req.body.description
	};
	console.log(Machine);
		const inputData = new machineModel(Machine);
		inputData
		.save()
		.then(()=> { res.status(200).send({message: "machine created"})})
		.catch((err) => {
			 res.status(400).send(err);
		});
});
router.get('/', (req, res) => {

	machineModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {	
			res.json(data);
		}
	});
});
module.exports = router;