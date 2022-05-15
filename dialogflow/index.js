const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});

createTaskIntent.intent('CreaNuovaTask', (conv, param, context) => {
    // console.log("conv: ")
    // console.log(conv);
    // console.log("param: ");
    console.log(param);
    // console.log("context: " + context);
    conv.ask("Task created");

   });
createTaskIntent.intent('CreaNuovaTaskAddName', (conv, param, context) => {
    // console.log("conv: ")
    // console.log(conv);
    // console.log("param: ");
    console.log(param);
    // console.log("context: " + context);
    conv.ask("Added task name and description");

   });
createTaskIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    // console.log("conv: ")
    // console.log(conv);
    // console.log("param: ");
    console.log(param);
    // console.log("context: " + context);
    conv.ask("Added assignee");

   });


module.exports = {
    createTaskIntent
}
