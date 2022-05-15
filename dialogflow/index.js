const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});

var Task = {};

createTaskIntent.intent('CreaNuovaTask', (conv, param, context) => {
    console.log(param);
    Task.expiry_date = param.date;
    console.log(Task);
    conv.ask("Task created, what would you like to call it?");
   });
createTaskIntent.intent('CreaNuovaTaskAddName', (conv, param, context) => {
    console.log(param);
    Task.name = param.taskname;
    Task.description = param.taskdescription;

    conv.ask("Added task name and description, who should I assign the task to?");

   });
createTaskIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    console.log(param);
    Task.assignee = param.person.name;
    const inputData = new taskModel(Task);
    console.log(inputData);
    conv.ask(`Assigned task to ${param.person.name}`);
    inputData
		.save()
		.then(()=> { res.status(200).send({message: "task created"})})
		.catch((err) => {
			 res.status(400).send(err);
		});

   });


module.exports = {
    createTaskIntent
}
