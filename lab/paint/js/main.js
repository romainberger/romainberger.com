/**
 *
 * Script containing all the functions to draw on the canvas
 *
 */

$(document).ready(function(){
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		mainColor = '#000',
		secondaryColor = '#fff',
		tool = 'pen',
		clickDown = false,
		lastX, lastY,
		tmpCanvas,
		isTempCanvas = false,
		startX, startY,
		endX, endY,
		type, color,
		isDrawCanvas = false;

	// fill the canvas with a white background to avoid a bug the eyedropper (returns rgb(0, 0, 0) when the canvas is empty)
	(function(){
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fillRect(0, 0, canvas.height, canvas.width);
	})();


	// manage the background color for the color picker
	$('#color_list li div').each(function(){
		$(this).css('background', $(this).attr('data-color'));
	});

	// main color selection
	$('#color_list li').click(function(e){
		var color = $(this).find('div').attr('data-color');
		$('#main_color').css('background', color);
		mainColor = color;
	});

	// secondary color selection
	$('#color_list li').bind('contextmenu', function(e){
		var color = $(this).find('div').attr('data-color');
		$('#secondary_color').css('background', color);
		secondaryColor = color;
		return false;
	});


	// tool selection
	$('#tool_bar button').click(function(){
		$('#tool_bar button').not($(this)).removeClass('selected');
		$(this).addClass('selected');
		tool = $(this).attr('id');

		var specialTools = ['line', 'rect', 'circle'];
		if($.inArray(tool, specialTools) == -1){
			removeTempCanvas();
		}
		else{
			createTempCanvas();
		}
	});


	// calculate the position of the cursor on the canvas
	function getPos(e){
		return {
			x : e.clientX - e.target.offsetLeft,
			y : e.clientY - e.target.offsetTop
		}
	}

	// functions to trigger the appropriate function according to the selected tool
	function targetTool(e, which){
		var pos = getPos(e);
		switch(tool){
			case 'pen':
				drawPen(pos, which);
				break;
			case 'erase':
				erase(pos, which);
				break;
			case 'brush':
				drawBrush(pos, which);
				break;
			case 'fill':
				fill(pos, which);
				break;
			case 'spray':
				spray(pos, which);
				break;
			case 'zoom':
				zoom(pos, which);
				break;
			case 'eyedropper':
				eyedropper(pos, which);
				break;
			case 'text':
				text(pos, which);
				break;
			case 'line':
				line(pos, which);
				break;
			case 'rect':
				rect(pos, which);
				break;
			case 'circle':
				circle(pos, which);
				break;
		}
	}

	// click management for the main canvas
	$(document).on({
		mousedown: function(e){
						clickDown = true;
						targetTool(e, e.which);
					},
		mouseup: function(){
						clickDown = false;
						lastX = null;
						lastY = null;
						if(isDrawCanvas)
							drawCanvas(startX, startY, endX, endY, type, color);
						startX = null;
						startY = null;
					},
		mousemove: function(e){
						if(clickDown)
							targetTool(e, e.which);
					},
		contextmenu: function(){
						return false;
					},
		mouseout: function(){
						lastX = null;
						lastY = null;
					}
	}, '#canvas, #tmpCanvas');

	// function to create a temporary canvas
	function createTempCanvas(){
		if(!isTempCanvas){
			isTempCanvas = true;

			var container = document.getElementById('canvas_wrapper');
			tmpCanvas = document.createElement('canvas');
			tmpCanvas.height = canvas.height;
			tmpCanvas.width = canvas.width;
			tmpCanvas.id = 'tmpCanvas';
			container.appendChild(tmpCanvas);

			$(tmpCanvas).css({
				'position': 'absolute',
				'z-index': 10
			});
			$('#canvas').css({
				'position': 'absolute',
				'z-index': 1
			});

			tmpCtx = tmpCanvas.getContext('2d');
		}
	}

	// remove the temporary canvas
	function removeTempCanvas(){
		isTempCanvas = false;
		$('#tmpCanvas').remove();
	}

	// draw on the main canvas
	function drawCanvas(startX, startY, endX, endY, type, color){
		switch(type){
			case 'line':
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineWidth = 3;
				ctx.lineTo(endX, endY);
				ctx.strokeStyle = color;
				ctx.stroke();
				ctx.closePath();
				break;

			case 'rect':
				ctx.lineWidth = 3;
				ctx.strokeStyle = color;
				ctx.strokeRect(startX, startY, endX - startX, endY - startY);
				break;

			case 'circle':
				ctx.lineWidth = 3;
				ctx.strokeStyle = color;
				ctx.beginPath();
				var tmpRadius1 = endX - startX,
					tmpRadius2 = endY - startY;
				var radius = Math.max.apply(Math, [Math.abs(tmpRadius1), Math.abs(tmpRadius2)]);
				ctx.arc(startX, startY, radius, 0, Math.PI*2, false);
				ctx.stroke();
				ctx.closePath();
		}

		isDrawCanvas = false;
	}

	/*****************************
		Functions for every tools
	*****************************/

	// eyedropper
	function eyedropper(pos, which){
		var imgData = ctx.getImageData( pos['x'], pos['y'], 1, 1 );
		var newColor = 'rgb(' + [ imgData.data[0],
                      imgData.data[1], 
                      imgData.data[2] ] + ')';
        if(which == 1){
        	mainColor = newColor;
        	$('#main_color').css('background', newColor);
        }
        else{
        	secondaryColor = newColor;
        	$('#secondary_color').css('background', newColor);
        }
	}

	// zoom
	function zoom(pos, which){
		if(which == 1){
			$('#canvas').css({
				'-moz-transform' : 'scale(2)',
				zoom : 2,
				position : 'relative',
				top : '-' + (pos['y'] - 100) + 'px',
				left : '-' + (pos['x'] - 200) + 'px'
			});
		}else{
			$('#canvas').css({
				'-moz-transform' : 'scale(1)',
				zoom : 1,
				top: 0,
				left: 0
			});
		}
	}

	// drawing
	function drawPen(pos, which){
		if(lastX == null && lastY == null){
			lastX = pos['x'];
			lastY = pos['y'];
		}

		ctx.beginPath();
		if(which == 1)
			ctx.fillStyle = mainColor;
		else
			ctx.fillStyle = secondaryColor;
		ctx.arc(pos['x'], pos['y'], 3, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineWidth = 6;
		ctx.lineTo(pos['x'], pos['y']);
		if(which == 1)
			ctx.strokeStyle = mainColor;
		else
			ctx.strokeStyle == secondaryColor;
		ctx.stroke();
		ctx.closePath();

		lastX = pos['x'];
		lastY = pos['y'];
	}

	// brush
	function drawBrush(pos, which){
		if(lastX == null && lastY == null){
			lastX = pos['x'];
			lastY = pos['y'];
		}

		ctx.beginPath();
		if(which == 1)	
			ctx.fillStyle = mainColor;
		else
			ctx.fillStyle = secondaryColor;
		ctx.arc(pos['x'], pos['y'], 15, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineWidth = 30;
		ctx.lineTo(pos['x'], pos['y']);
		if(which == 1)
			ctx.strokeStyle = mainColor;
		else
			ctx.strokeStyle = secondaryColor;
		ctx.stroke();
		ctx.closePath();

		lastX = pos['x'];
		lastY = pos['y'];
	}

	// erasing
	function erase(pos, which){
		if(lastX == null && lastY == null){
			lastX = pos['x'];
			lastY = pos['y'];
		}

		if(which == 1)
			ctx.fillStyle = 'rgb(255, 255, 255)';
		else
			ctx.fillStyle = secondaryColor;
		
		ctx.beginPath();
		ctx.arc(pos['x'], pos['y'], 15, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineWidth = 30;
		ctx.lineTo(pos['x'], pos['y']);
		if(which == 1)
			ctx.strokeStyle = 'rgb(255, 255, 255)';
		else
			ctx.strokeStyle = secondaryColor;
		ctx.stroke();
		ctx.closePath();

		lastX = pos['x'];
		lastY = pos['y'];
	}

	// fill
	function fill(pos, which){
		ctx.clearRect(0, 0, canvas.height, canvas.width);
		if(which == 1)
			ctx.fillStyle = mainColor;
		else
			ctx.fillStyle = secondaryColor;
		
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	// spray
	function spray(pos, which){
		if(which == 1)
			ctx.fillStyle = mainColor;
		else
			ctx.fillStyle = secondaryColor;

		for(i = 0; i <= 16; i++){
			var randX = Math.floor(Math.random() * 40),
				randY = Math.floor(Math.random() * 40),
				randSize = Math.floor(Math.random() * (4 - 1 + 1) + 1);
			ctx.beginPath();
			if(i < 4)
				ctx.arc(pos['x'] + randX, pos['y'] + randY, randSize, 0, Math.PI*2, false);
			else if(i >= 4 && i < 8)
				ctx.arc(pos['x'] - randX, pos['y'] - randY, randSize, 0, Math.PI*2, false);
			else if(i >= 8 && i < 12)
				ctx.arc(pos['x'] + randX, pos['y'] - randY, randSize, 0, Math.PI*2, false);
			else
				ctx.arc(pos['x'] - randX, pos['y'] + randY, randSize, 0, Math.PI*2, false);
			ctx.fill();
			ctx.closePath();
		}
	}

	// text
	function text(pos, which){
		ctx.font = '20pt serif';
		ctx.fillStyle = mainColor;
		ctx.fillText('Text', pos['x'], pos['y'] + 10);
	}

	// line
	function line(pos, which){
		if(startX == null && startY == null){
			startX = pos['x'];
			startY = pos['y'];
		}

		tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

		tmpCtx.beginPath();
		tmpCtx.moveTo(startX, startY);
		tmpCtx.lineWidth = 3;
		tmpCtx.lineTo(pos['x'], pos['y']);
		if(which == 1){
			tmpCtx.strokeStyle = mainColor;
			color = mainColor;
		}
		else{
			tmpCtx.strokeStyle = secondaryColor;
			color = secondaryColor;
		}
		tmpCtx.stroke();
		tmpCtx.closePath();

		endX = pos['x'];
		endY = pos['y'];
		type = 'line';
		isDrawCanvas = true;
	}

	function rect(pos, which){
		if(startX == null && startY == null){
			startX = pos['x'];
			startY = pos['y'];
		}

		tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

		tmpCtx.lineWidth = 3;
		if(which == 1){
			tmpCtx.strokeStyle = mainColor;
			color = mainColor;
		}
		else{
			tmpCtx.strokeStyle = secondaryColor;
			color = secondaryColor;
		}
		tmpCtx.strokeRect(startX, startY, pos['x'] - startX, pos['y'] - startY);

		endX = pos['x'];
		endY = pos['y'];
		type = 'rect';
		isDrawCanvas = true;
	}

	function circle(pos, which){
		if(startX == null && startY == null){
			startX = pos['x'];
			startY = pos['y'];
		}

		tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

		tmpCtx.beginPath();
		tmpCtx.lineWidth = 3;
		if(which == 1){
			tmpCtx.strokeStyle = mainColor;
			color = mainColor;
		}
		else{
			tmpCtx.strokeStyle = secondaryColor;
			color = secondaryColor;
		}
		var tmpRadius1 = pos['x'] - startX,
			tmpRadius2 = pos['y'] - startY;
		var radius = Math.max.apply(Math, [Math.abs(tmpRadius1), Math.abs(tmpRadius2)]);
		
		tmpCtx.arc(startX, startY, radius, 0, Math.PI*2, false);
		tmpCtx.stroke();
		tmpCtx.closePath();

		endY = pos['y'];
		endX = pos['x'];
		type = 'circle';
		isDrawCanvas = true;
	}

	/********************
		Menu button
	********************/

	$('.menu').click(function(){
		$('.expanded').hide().removeClass('expanded');
		var sub_menu = $(this).next('.sub_menu');
		if(!$(sub_menu).hasClass('expanded'))
			$(sub_menu).show().addClass('expanded');
		else
			$(sub_menu).hide().removeClass('expanded');
	});

	$(document).mouseup(function(e){
		var container = $('.expanded');
		if(container.has(e.target).length === 0)
			container.hide().removeClass('expanded');
	});

	$('.sub_menu button').click(function(){
		$('.expanded').hide().removeClass('expanded');
	});

	// new file
	$('#newFile').click(function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	});

	// save
	$('#save').click(function(){
		var url = canvas.toDataURL('image/png');
		window.open(url,'Download');
	});
});