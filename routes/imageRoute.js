const express = require('express');
const router = express.Router();
const uploadController = require("../controllers/upload");

router.get("/files", uploadController.getListFiles);
router.post("/", uploadController.uploadFiles);
router.get("/files/:name", uploadController.download);

module.exports = router;