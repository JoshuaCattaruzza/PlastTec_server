const mongoose = require('mongoose'); //import mongoose

const Task = mongoose.model(
	'Task',
	new mongoose.Schema({
	name: String,
    description: String,
    estimated_time: String,
    expiry_date: String,
    note: String,
    timer: String,
    assigned_to_machine: {
        id_machine: String,
        name: String
    },
    assignee: {
        user_id: String,
        name: String
    },
    assigner: {
        user_id: String,
        name: String
    },
    planned_date: String,
    location: {
        name: String,
        long: Number,
        lat: Number
    },
    status:{
        active: Boolean,
        pending: Boolean,
        done: Boolean
    }
})
);

module.exports = Task;
