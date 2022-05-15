const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});


	var Task = {
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
	
createTaskIntent.intent('CreaNuovaTask', (conv, param, context) => {
    console.log(param);
    Task.expiry_date = param.date_time;
   });
createTaskIntent.intent('CreaNuovaTaskAddName', (conv, param, context) => {
    console.log(param);
    Task.name = param.taskname;
    Task.description = param.taskdescription;

    conv.ask("Added task name and description");

   });
createTaskIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    console.log(param);
    Task.assignee = param.person.name;
    const inputData = new taskModel(Task);
    console.log(inputData);
    conv.ask("Added assignee");

   });


module.exports = {
    createTaskIntent
}
