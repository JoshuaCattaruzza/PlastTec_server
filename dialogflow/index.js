const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});

var Task = {};

createTaskIntent.intent('CreaNuovaTask', (conv, param, context) => {
    console.log(param);
    Task.expiry_date = param.date;
    console.log(Task);
    conv.ask(`Task created, what would you like to call it?`);
   });
createTaskIntent.intent('CreaNuovaTaskAddName', (conv, param, context) => {
    console.log(param);
    Task.name = param.taskname;
    Task.description = param.taskdescription;

    conv.ask(`Task name is ${param.taskname}, who should I assign the task to?`);

   });
createTaskIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    console.log(param);
    Task.assignee = param.person.name;
    Task.active = true;
    const inputData = new taskModel(Task);
    console.log(inputData);
    conv.ask(`Assigned task to ${param.person.name}`);
    inputData.save();

   });
createTaskIntent.intent('StatusReport', (conv, param, context) => {
    console.log(param);

    taskModel.find({}, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			var returnArr = [];
			data.forEach(task => {
				if (task.active === true)
					returnArr.push(task);
			});
            conv.ask(`There are ${returnArr.length} active tasks at the moment`);
		}
	});
    
   });


module.exports = {
    createTaskIntent
}
