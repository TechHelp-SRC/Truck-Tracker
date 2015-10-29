var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Location = require('../models/location.js');

router.get('/', function(req, res) {
	
	console.log("====");
	console.log(parseFloat(req.query.lat.substring(0, 2)) + parseFloat(req.query.lat.substring(2, req.query.lat.length))/60.0);
	console.log(-(parseFloat(req.query.lon.substring(0, 2)) + parseFloat(req.query.lon.substring(2, req.query.lon.length))/60.0));
	console.log(req.query.alt);
	console.log(req.query.bat);
	console.log(req.query.sig);
	
	//console.log(req.query.alt);
	console.log("====");

	var loc = new Location();
	
	loc.lat = parseFloat(req.query.lat.substring(0, 2)) + parseFloat(req.query.lat.substring(2, req.query.lat.length))/60.0;
	loc.lon = -(parseFloat(req.query.lon.substring(0, 2)) + parseFloat(req.query.lon.substring(2, req.query.lon.length))/60.0);
	loc.alt = req.query.alt;
	loc.bat = req.query.bat;
	loc.sig = req.query.sig;
		
	loc.save(function(err) {

		if (err) {
			res.send(err);
		}

		
		res.send("New location recorded");
		
	});
	
});

/*
router.post('/', function(req, res) {
	
	console.log(req.body);
	
	var loc = new Location();
	
	loc.lat = req.body.lat;
	loc.lon = req.body.lon;
	loc.alt = req.body.alt;
		
	loc.save(function(err) {

		if (err) {
			res.send(err);
		}
		
		res.send("New location recorded");
		
	});
	
});
*/

router.get('/test', function(req, res) {
	
	var q = Location.find().sort({"timeStamp": -1}).limit(1);
	
	q.exec(function(err, locations) {
		
		if (err) {
			
			res.send(err);
			
		} else {
			
			res.json(locations);
			
		}
		
	});
	
});





module.exports = router;


