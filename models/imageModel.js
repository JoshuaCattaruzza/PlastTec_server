const mongoose = require('mongoose'); //import mongoose

const Image = mongoose.model(
	'Image',
	new mongoose.Schema({
        name: {
            type:String,
            required:true
        },
        image:{
            data: Buffer,
            contentType: String
        }
	})
);

module.exports = Image;
