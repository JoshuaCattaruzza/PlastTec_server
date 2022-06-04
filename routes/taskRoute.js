const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');


router.post('/create', (req, res) => {
	const Task = {
		name: req.body.name,
		description: req.body.description,
		estimated_time: req.body.estimated_time,
		expiry_date: req.body.expiry_date,
		note: req.body.note,
		assigned_to_machine: {
			id_machine: req.body.assigned_to_machine.id_machine,
			name: req.body.assigned_to_machine.name
		},
		assignee: {
			user_id: req.body.assignee.user_id,
			name: req.body.assignee.name
		},
		assigner: {
			user_id: req.body.assigner.user_id,
			name: req.body.assigner.name
		},
		planned_date:  req.body.planned_date,
		location: {
			name: req.body.location.name,
			long: req.body.location.long,
			lat: req.body.location.lat
		},
		status:{
			active: req.body.status.active,
			pending: req.body.status.pending,
			done: req.body.status.done
		}
	};
	console.log(Task);
	const inputData = new taskModel(Task);
	inputData
	.save()
	.then(()=> { res.status(200).send({message: "task created"})})
	.catch((err) => {
			res.status(400).send(err);
	});
});

router.get('/', (req, res) => {
	taskModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if (task.status.active === true)
					returnArr.push(task);
			});
			res.json(returnArr);
		}
	});
});

router.get('/closed', (req, res) => {
	taskModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if (task.active === false)
					returnArr.push(task);
			});
			res.json(returnArr);
		}
	});
});

router.patch("/close/:_id", (req, res) =>{
	var id = { _id: req.params._id }
	taskModel.findById(id).exec((err, task)=>{
		var status = task.active;
		taskModel.findByIdAndUpdate(id, {active: !status, end: new Date()}, (err) =>{
			if (err) {
				return res.send(err);
				
			} else {
				return res.send({ message: `changed task status to ${!status}`});		
			}
		}
	)})
});

router.delete('/:_id', (req, res) => {
	const Task = req.params._id;
	console.log(Task)
	taskModel
		.findByIdAndDelete(Task)
		.then(res.json({ message: 'task deleted succesfully' }))
		.catch((err) => {
			res.status(400).send(err.json());
		});
});

module.exports = router;
