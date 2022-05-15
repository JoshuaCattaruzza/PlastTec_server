const express = require('express');
const router = express.Router();

const {createTaskIntent} = require("../dialogflow/index");

router.post('/create',createTaskIntent);

module.exports = router;