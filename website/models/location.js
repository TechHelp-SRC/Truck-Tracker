var mongoose = require('mongoose');

var Location = new mongoose.Schema({
	
	timeStamp: { type: Date, default: Date.now },
	lat: Number,
	lon: Number,
	alt: Number,
	sig: Number,
	bat: Number,
	
});

module.exports = mongoose.model("Location", Location);
