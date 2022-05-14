const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const taskModel = require('../models/taskModel');
const {statusIntent} = require("../dialogflow/index");
console.log(statusIntent);

router.post('/status',statusIntent);

module.exports = router;