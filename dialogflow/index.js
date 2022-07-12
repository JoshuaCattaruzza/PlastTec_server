const {dialogflow} = require('actions-on-google');
const taskModel = require('../models/taskModel');
const notificationModel = require('../models/notificationModel');
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
    Task.assignee.name = param.person.name;
    Task.status.active = true;
    const inputData = new taskModel(Task);
    console.log(inputData);
    conv.ask(`Assigned task to ${param.person.name}`);
    inputData.save();

   });
createTaskIntent.intent('StatusReport', (conv, param, context) => {
    console.log(param);
    var active = [];
    var done = [];
    var pending = [];
    return taskModel.find({}).then((data) => {
        data.forEach(task => {
            if (task.status.active === true)
                active.push(task);
            if (task.status.pending === true)
                pending.push(task);
        });
        conv.ask(`Currently there are ${active.length} active tasks and ${pending.length} pending tasks`);
		})
   });
createTaskIntent.intent('getActiveUsers', (conv, param, context) => {
    var returnArr = [];
    return taskModel.find({}).then((data) => {
        data.forEach(task => {
            if(task.status.active === true)
                returnArr.push(task);
        });
    console.log(returnArr);
    var arr = [];
    for (let index = 0; index < returnArr.length; index++) {
        const element = returnArr[index];
        var name = element.assignee.name;
        arr.push(name);
    };
    var nameList = [...new Set(arr)];
    console.log(nameList);
    var responseString =  "";

    for (let index = 0; index < nameList.length; index++) {
        const element = nameList[index];
        if(index !== nameList.length -1)
            responseString += element + ", "; 
        else
            responseString += element; 
    }
    console.log(responseString);
    if(responseString === "")
        conv.ask(`No one in working at the moment`); 
    else  
        conv.ask(`People who are currently working are: ${responseString}`);
		})
   });
createTaskIntent.intent('getTaskNameByUser', (conv, param, context) => {
    console.log(param);
    var name = param.person.name;
    var returnArr = [];
    return taskModel.find({}).then((data) => {
        data.forEach(task => {
            if(task.status.active === true && task.assignee.name === name.toLowerCase())
                returnArr.push(task);
        });
    console.log(returnArr);
    var responseString =  "";

    for (let index = 0; index < returnArr.length; index++) {
        const element = returnArr[index];
        if(index !== returnArr.length -1)
            responseString += element.name + " in " + element.location.name + ", "; 
        else
            responseString += element.name + " in " + element.location.name; 
    }
    console.log(responseString);
    conv.ask(`${name} has the following tasks: ${responseString}`);
		})
   });

createTaskIntent.intent('setUserNotification', (conv, param, context) => {
    var name = param.person.name.toLowerCase();
    const Notification = {
        notification:{
			hasNotification: true,
			text: "Hurry up!",
            username: name
		},
    };
	const inputData = new notificationModel(Notification);
	inputData
	.save()
    conv.ask(`Notification set`);
});

module.exports = {
    createTaskIntent
}
