var width;
var height;

var topGraphHeight;
var bottomGraphHeight;

var maxBarWidth = 10;

var rndData = [];

var tgPaper;

var minTGWidth;
var maxTGWidth;

var bgPaper;

var graphSet;

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

$(document).ready(function() {
	
	generateMockData();
	
	width = $('#trafficGraph').width();
	height = $('#trafficGraph').height(); 	
	
	addGraphDivs();
	
	addMouseWheelEvents();
	
	setupTheGraphs();
	
});

function addGraphDivs() {
	
	topGraphHeight = (height * .8) - 5;
	bottomGraphHeight = (height * .2) - 5;
	
	var topDiv = $('<div id="topGraph">').css({'width': width, 'height': topGraphHeight, "float": "left"});
	$('#trafficGraph').append(topDiv);
	
	var bottomDiv = $('<div id="bottomGraph">').css({'width': width, 'height': bottomGraphHeight, "float": "left", "margin-top": "10px"});
	$('#trafficGraph').append(bottomDiv);
	
	
}

function addMouseWheelEvents() {
	
	$('#topGraph').mousewheel(function (event, delta) {
		

		
		
		return false;
	});
	
	$('#bottomGraph').mousewheel(function (event, delta) {
		
		//Center and zoom the highlighted portion
		
		if (Math.abs(event.deltaY) > 0) {

			var currentProportions = bgPaper.highlighter.getBBox();
			
			var centerPointX = currentProportions.x + (currentProportions.width/2.0);
			
			var newWidth = (currentProportions.width + event.deltaY < 0) ? 2 : currentProportions.width + event.deltaY;
			if (newWidth > width) {
				newWidth = width;
			}
			
			var newX = centerPointX - newWidth/2.0;
			
			if (newX < 0) {
				
				newX = 0;
				
			} else if (newX + newWidth > width) {
				
				newX = width - newWidth;
				
			}
			
			bgPaper.highlighter.remove();
			
			bgPaper.highlighter = bgPaper.rect(newX, 0, newWidth, bottomGraphHeight).attr({
				
				fill: 'grey',
				stroke: 'transparent',
				opacity: .6
				
			});

		}
		
		if (Math.abs(event.deltaX) > 0) {
			
			bgPaper.highlighter.transform('...t' + -(event.deltaX * .6) + ',0');
			
			if (bgPaper.highlighter.getBBox().x < 0)
				bgPaper.highlighter.transform("...t" + (-bgPaper.highlighter.getBBox().x) + ",0");
			
			if (bgPaper.highlighter.getBBox().x + bgPaper.highlighter.getBBox().width > width) {
				console.log("too far");	
				bgPaper.highlighter.transform("...t" + (width - (bgPaper.highlighter.getBBox().x + bgPaper.highlighter.getBBox().width)) + ",0");
				
			}
			
			
		}
		
		updateTopGraph();
		
		return false;
	});
	
}

function setupTheGraphs() {
	
	tgPaper = new Raphael($('#topGraph')[0], width, topGraphHeight);
	tgPaper.rect(0, 0, width, topGraphHeight).attr({fill: 'transparent', stroke: 'black'});
	
	bgPaper = new Raphael($('#bottomGraph')[0], width, bottomGraphHeight);
	bgPaper.rect(0, 0, width, bottomGraphHeight).attr({fill: 'transparent', stroke: 'black'});
	
	
	//Draw the BG Grids
	
	var hGridSpacing = width / 50;
	var vGridSpacing = bottomGraphHeight / 8;
	
	for (var i = 0; i < 50; i++) {
		
		bgPaper.path([['M', (i * hGridSpacing), 0], ['l', 0, bottomGraphHeight]]).attr({stroke: 'black', opacity: .5});
		
	}
	
	for (var i = 0; i < 50; i++) {
		
		bgPaper.path([['M', 0, (i * vGridSpacing)], ['l', width, 0]]).attr({stroke: 'black', opacity: .5});
		
	}
	
	//Draw the data
		
	var widthOfColumn = width / rndData.length;
	
	if (widthOfColumn < 1) {
		
		//Sample Data
		var dataSkipNumber = Math.floor(rndData.length/width);
		
		for (var i = 0; i < width; i++) {
			
			var dataPoint = rndData[i * dataSkipNumber];
			
			bgPaper.path([['M', i, bottomGraphHeight], ['l', 0, -((dataPoint.count/100.0) * bottomGraphHeight)]]).attr({stroke: 'blue'});
			
		}
		
	}
	
	bgPaper.highlighter = bgPaper.rect(width * .75, 0, 2, height).attr({
		
		fill: 'grey',
		stroke: 'transparent',
		opacity: .6
		
	});
	
	//Get the high point of the data
	
	var highestVal = 0;
	
	for (var i = 0; i < rndData.length; i++) {
		
		var dataPoint = rndData[i];
		
		highestVal = (dataPoint.count > highestVal) ? dataPoint.count : highestVal;
		
	}
	
	highestVal *= 1.1;
	maxTGWidth = maxBarWidth * rndData.length;
	
	graphSet = tgPaper.set();
	
	for (var i = 0; i < (topGraphHeight / 10); i++) {
		
		var path = tgPaper.path([["M", 0, (i * (topGraphHeight/10))], ['l', maxTGWidth, 0]]).attr({stroke: "grey"});
		
		graphSet.push(path);
		
	}
	
	//Plot the data
	
	var linePath = [['M', 0, topGraphHeight]];
	console.log(topGraphHeight - ((rndData[0].count/highestVal) * topGraphHeight));
	for (var i = 1; i < rndData.length; i++) {
		
		linePath.push(['l', 0, -((rndData[i].count/highestVal) * topGraphHeight)]);
		linePath.push(['M', i * 10, topGraphHeight]);
	}
	
	graphSet.push(tgPaper.path(linePath).attr({stroke: 'red', 'stroke-width': 4}));
	
	
	
}

function generateMockData() {
	
	var startDate = new Date(2015, 6, 4, 8);
	var endDate = new Date();
	
	var currentDate = startDate;
	
	while (currentDate < endDate) {
		
		var obj = {};
		
		obj.date = currentDate;
		obj.count = Math.floor(Math.random() * 101);
		
		currentDate.addHours(1);
		
		rndData.push(obj);
		
	}
	
	console.log(rndData.length);
	
}

function updateTopGraph() {
	
	//Determine scale
	
	var desiredWidth = (width * width) / bgPaper.highlighter.getBBox().width;
	
	var scaleFactor = desiredWidth / maxTGWidth
	
	graphSet.transform('S' + scaleFactor + ',1,100,100');
	

 	var offsetPercentage = (bgPaper.highlighter.getBBox().x / width);
	console.log(offsetPercentage); 	
 	var translateVal = graphSet.getBBox().width * offsetPercentage;
// 	console.log(translateVal);
 	
// 	graphSet.transform('T' + (-translateVal) + ',0');

	
}