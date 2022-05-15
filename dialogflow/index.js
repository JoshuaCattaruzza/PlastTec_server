const {dialogflow} = require('actions-on-google');
const mongoose = require("mongoose");
const taskModel = require('../models/taskModel');

const createTaskIntent = dialogflow({debug: false});

createTaskIntent.intent('CreaNuovaTaskAddAssignee', (conv, param, context) => {
    console.log("conv: ")
    console.log(conv);
    console.log("param: ");
    console.log(param);
    console.log("context: " + context);
    conv.ask("Ho creato una task");

   });


module.exports = {
    createTaskIntent
}
