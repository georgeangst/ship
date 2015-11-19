'use strict';

function Game(){

	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	var self = this;

	this.init = function() {
		context.beginPath();
		context.moveTo(0, 0);

		// quadratic curve
		context.quadraticCurveTo(150, 150, 300, 300);
		// center hor
		// center vert
		// final hor
		// final vert
		context.lineWidth = 1;
		context.strokeStyle = 'blue';
		context.stroke();

		self.createSliderControl(120, 10, 20);

		window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame
        	|| window.webkitRequestAnimationFrame
        	|| window.mozRequestAnimationFrame
        	|| window.oRequestAnimationFrame 
        	|| window.msRequestAnimationFrame
        	|| function(callback) {
		          window.setTimeout(callback, 1000 / 60);
		       };
      })();
	}



	this.createSliderControl = function (width, startX, startY) {

		var rectHeight = 20;
		var rectWidth = 10;
		//draw line
		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(width - startX, startY);
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();

		//draw rect
		context.beginPath();
		context.rect(startX, startY - (rectHeight / 2), rectWidth, rectHeight);
		context.fillStyle = 'white';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = 'black';
		context.stroke();


	}

	this.writeMessage = function(canvas, message) {

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = '18px Calibri';
		context.fillStyle = 'black';
		context.fillText(message, 10, 25);
	}
	this.getMousePos = function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
		  x: evt.clientX - rect.left,
		  y: evt.clientY - rect.top
		};
	}


	canvas.addEventListener('mousedown', function(evt) {
		var mousePos = self.getMousePos(canvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		self.writeMessage(canvas, message);
	}, false);

}

var game = new Game().init();

