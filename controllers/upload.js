const upload = require("../middleware/upload");
const dbConfig = require("../config/dbConfig");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.URL;
const baseUrl = "https://api.joshuacattaruzza.com/api/upload/files/";
const mongoClient = new MongoClient(url);
const taskModel = require('../models/taskModel');

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res); 
    if (req.file == undefined) {
      return res.send({
        message: "error",
      });
    }
    var id = req.body.task_id;
    console.log(id);
    taskModel.findByIdAndUpdate(
      id, 
      {image_url: baseUrl+res.req.file.filename},
      (err) => {
        if (err) {
          return res.send(err);
        } 
        else {
          return res.send({ message: `uploaded image`});		
        }
      }
    )
  } catch (error) {
    console.log(error);
    return res.send({
      message: error
    });
  }
};
const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.DB);
    const images = database.collection(dbConfig.IMG_BUCKET + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      console.log(doc);
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.DB);
    const bucket = new GridFSBucket(database, {
      bucketName: dbConfig.IMG_BUCKET,
    });
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "errore" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  uploadFiles,
  getListFiles,
  download,
};