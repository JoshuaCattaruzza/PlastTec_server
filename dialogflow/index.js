const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});

var Task = {};

createTaskIntent.intent('CreaNuovaTask', (conv, param, context) => {
    console.log(param);
    Task.expiry_date = param;
    console.log(Task);
    conv.ask("Task created");
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
