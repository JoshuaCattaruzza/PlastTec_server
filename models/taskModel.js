const mongoose = require('mongoose'); //import mongoose

const Task = mongoose.model(
	'Task',
	new mongoose.Schema({
		name: String,
		description: String,
		estimated_time: String,
		expiry_date: String,
		assigned_to_machine: Array,
		assignee: String,
		assigner: String,
		planned_date:  String,
		active: Boolean
	})
);

module.exports = Task;
