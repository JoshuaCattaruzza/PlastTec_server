const mongoose = require('mongoose'); //import mongoose

const Machine = mongoose.model(
	'Machine',
	new mongoose.Schema({
        type: String,
		name: String,
		description: String,
	})
);

module.exports = Machine;
