const express = require('express');
const router = express.Router();
const notificationModel = require('../models/notificationModel');

router.get('/:name', (req, res) => {
	var username = req.params.name; 
	console.log(username)
	notificationModel.find({}, (err, data) => {
		if (err) {
			res.json(err);
		} else {
			var returnArr = [];
			data.forEach(not =>{
				if(not.notification.username === username)
					returnArr.push(not);
				});
			if(returnArr.length !== 0)
				res.json(returnArr[0]);
			else
				res.json({notification:{ hasNotification: false}});
		}
	});
});

module.exports = router;