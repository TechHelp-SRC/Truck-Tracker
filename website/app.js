var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27017/TruckTracker");

//Import routes modules
var main = require('./routes/index');
var location = require('./routes/location');

var app = express();

app.set('port', (process.env.PORT || 4002));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



//Setup Routes

app.use('/', main);
app.use('/location', location);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//commit test
