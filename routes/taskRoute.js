const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const taskModel = require('../models/taskModel');


router.post('/create', (req, res) => {
	
	const Task = {
		name: req.body.name,
		description: req.body.description,
		estimated_time: req.body.estimated_time,
		expiry_date: req.body.expiry_date,
		assigned_to_machine: req.body.assigned_to_machine,
		assignee: req.body.assignee,
		assigner: req.body.assigner,
		planned_date:  req.body.planned_date,
		active: req.body.active
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
				if (task.active === true)
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
				return res.send({ message: `changed game status to ${!status}`});
				
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









// router.patch('/join/:_id', (req, res) => {
// 	var id = { _id: req.params._id }
// 	const Player = {
// 		_id: req.body._id,
// 		username: req.body.username,
// 		starting_stack: req.body.starting_stack,
// 		finishing_stack: 0,
// 		in_game:  req.body.in_game
		
// 	};
// 	gameModel.findById(id).exec((err, game) => {
// 		var players = game.players;
// 		var duplicatePlayer = false
// 		players.forEach(player => {
// 			if (player._id == Player._id) {
// 				duplicatePlayer=true
				
// 			}});
// 			if(duplicatePlayer){
// 				return res.status(400).send({message:"player already exists"})
// 			}else{
// 				gameModel.findByIdAndUpdate(
// 					id,
// 					{ $push: { players: Player } },
// 					(err) => {
// 						if (err) {
// 							return res.send(err);
							
// 						} else {
// 							return res.send({ message: 'player added to game succesfully' });
							
// 						}
// 					}
// 				);
// 			}
// 	}
// 	);
// });

// router.patch("/addon/:_id", (req, res) =>{
// 	var id = req.params._id;
// 	var user_id = req.body.user_id;
// 	var addon = req.body.addOn;
//     gameModel.findOne({"_id": id}, {"players":{$elemMatch: {"_id": user_id}}}, (err, game)=>{
// 		var player =  game.players[0];
// 		player.addons.push(addon);
// 		game.save();
// 		console.log(player.addons);
// 	});
// 	res.send("done");
// })
// router.patch("/leave/:_id", (req, res) =>{
// 	var id = { _id: req.params._id };

// 	var user_id = req.body._id;
// 	var finishing_stack = req.body.finishing_stack;

// 	console.log(user_id, finishing_stack);

// 	gameModel.findById(id).then((game=>{
// 		const player = game.players.id(user_id);
// 		console.log(player);
// 		player.set({finishing_stack: finishing_stack, in_game: false});
// 		return game.save();
// 	})).then((player)=>{res.send({player})}).catch((err)=>{res.send(err)})
	
// })

// router.get('/:_id', (req, res) => {
// 	const Id = req.params._id;
// 	console.log(Id);
// 	gameModel.findById(Id, (err, data) => {
// 		if (err) {
// 			res.json(err);
// 		} else {
// 			res.json(data);
// 		}
// 	});
// });



module.exports = router;
