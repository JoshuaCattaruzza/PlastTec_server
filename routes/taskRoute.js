const express = require('express');
const router = express.Router();
const taskModel = require('../models/taskModel');
const { authJwt } = require('../middleware');
// const controller = require('../controllers/userController');

// router.use([authJwt.verifyToken]);

router.post('/create', (req, res) => {
	const Task = {
		name: req.body.name,
		description: req.body.description,
		estimated_time: req.body.estimated_time,
		expiry_date: req.body.expiry_date,
		note: req.body.note,
		image_url: "",
		timer: "",
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

router.get('/mobile/:_id', (req, res) => {
	var id = req.params._id; 
	console.log(id)
	taskModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if(task.assignee.user_id === id)
					if (task.status.pending === false && task.status.done === false)
						returnArr.push(task);
			});
			res.json(returnArr);
		}
	});
});
router.get('/mobile/pending/:_id', (req, res) => {
	var id = req.params._id; 
	taskModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if(task.assignee.user_id === id)
					if (task.status.active === false && task.status.pending === true && task.status.done === false)
						returnArr.push(task);
			});
			res.json(returnArr);
		}
	});
});
router.get('/', (req, res) => {
	taskModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if (task.status.done === false)
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
				if (task.status.done === true)
					returnArr.push(task);
			});
			res.json(returnArr);
		}
	});
});
router.patch("/mobile/endTimer/:_id", (req, res) =>{

	var id = { _id: req.params._id }
	var timer = req.body.timer;

	taskModel.findByIdAndUpdate(
		id, 
		{timer: timer},
		(err) => {
			if (err) {
				return res.send(err);
			} 
			else {
				return res.send({ message: `updated task`});		
			}
		}
	)
});
router.patch("/mobile/updateStatus/:_id", (req, res) =>{

	var id = { _id: req.params._id }
	var updatedStatus = {...req.body};
	var allowedUpdate = 0;
	console.log(updatedStatus)
	for (const key in updatedStatus) {
		if (Object.hasOwnProperty.call(updatedStatus, key)) {
			const element = updatedStatus[key];
			if(element)
				allowedUpdate++;
		}
	}

	if(allowedUpdate === 1) {
		taskModel.findByIdAndUpdate(
			id, 
			{status: updatedStatus},
			(err) => {
				if (err) {
					return res.send(err);
				} 
				else {
					return res.send({ message: `updated task`});		
				}
			}
		)
	}
	else {
		res.status(400).send({ message: `bad request`});		
	}
});
router.patch("/done/:_id", (req, res) =>{

	var id = { _id: req.params._id }
	var updatedStatus = {...req.body};
	var allowedUpdate = 0;
	console.log(updatedStatus)
	for (const key in updatedStatus) {
		if (Object.hasOwnProperty.call(updatedStatus, key)) {
			const element = updatedStatus[key];
			if(element)
				allowedUpdate++;
		}
	}

	if(allowedUpdate === 1) {
		taskModel.findByIdAndUpdate(
			id, 
			{status: updatedStatus},
			(err) => {
				if (err) {
					return res.send(err);
				} 
				else {
					return res.send({ message: `updated task`});		
				}
			}
		)
	}
	else {
		res.status(400).send({ message: `bad request`});		
	}
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
