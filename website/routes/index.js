var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	
	res.render("index", {title: "Fork In The Road - Tracker"});
	
});

module.exports = router;