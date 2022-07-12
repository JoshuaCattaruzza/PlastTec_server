const mongoose = require('mongoose'); //import mongoose

const Notification = mongoose.model(
	'Notification',
	new mongoose.Schema({
		notification:{
			hasNotification: Boolean,
			text: String,
			username: String
		},
	})
);

module.exports = Notification;