var paper;

$(document).ready(function () {
	
	paper = new Raphael($('#trafficTest')[0], 1000, 600);
	
	drawUI();
			
});

function drawUI() {
	
	//Draw the outline
	
	paper.rect(0, 0, 1000, 600, 15).attr({
		
		fill: 'black',
		stroke: 'transparent',
		'stroke-width': 2
		
	});
	
	paper.rect(1, 1, 998, 598, 14).attr({
		
		fill: 'white',
		stroke: 'transparent'
		
	});

	var scrollCatch = paper.rect(100, 500, 800, 75).attr({
		
		fill: 'purple',
		stroke: 'transparent';
		
	});	
	
	scr
	
}

