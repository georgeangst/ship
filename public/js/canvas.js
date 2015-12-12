'use strict';

(function() {
	var app = this;

	var Canvas = function() {

		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.canvasWidth = this.canvas.width;
		this.canvasHeight = this.canvas.height;

		this.update = function(delta) {

			for (var i = 0; i < app.game.players.length; i++) {
				app.game.players[i].update(delta);
			}

			if (app.game.bullets.length > 0) {
				for (var z = 0; z < app.game.bullets.length; z++) {
					app.game.bullets[z].update(delta);
				}
			}

		};

		this.calcInterpolation = function(last, current, interpolationPercent) {
			return last + (current - last) * interpolationPercent;
		};

		this.drawShip = function(interpolationPercent) {

			for (var i = 0; i < app.game.players.length; i++) {

				//var x = this.calcInterpolation(app.game.players[i].lastX, app.game.players[i].x, interpolationPercent),
				//		y = this.calcInterpolation(app.game.players[i].lastY, app.game.players[i].y, interpolationPercent),
				//		angle = this.calcInterpolation(app.game.players[i].lastAngle, app.game.players[i].angle, interpolationPercent);

				//console.log(x, app.game.players[i].x)

				this.context.save();
				//move context to players coordinates
				this.context.translate(app.game.players[i].x, app.game.players[i].y);
				//rotate context to a new angle
				this.context.rotate(Math.PI / 180 * app.game.players[i].angle);
				//draw player's boat
				this.context.drawImage(app.boat, -(app.boat.width / 2), -(app.boat.height / 2));
				//restore context
				this.context.restore();
			};

		};

		this.drawBullet = function(interpolationPercent) {

			for (var i = 0; i < app.game.bullets.length; i++) {
				//var x = this.calcInterpolation(app.game.bullets[i].lastX, app.game.bullets[i].x, interpolationPercent),
				//		y = this.calcInterpolation(app.game.bullets[i].lastY, app.game.bullets[i].y, interpolationPercent);
				//
				//console.log(x, app.game.bullets[i].x)
				this.context.save();
				this.context.translate(app.game.bullets[i].x, app.game.bullets[i].y);
				//rotate context to a bullet trajectory angle
				//context.rotate(Math.PI/180 * this.shootAngle);
				this.context.beginPath();
				this.context.arc(0, 0, 2, 0, Math.PI*2);
				this.context.fillStyle = app.game.bullets[i].bulletColor;
				this.context.fill();
				this.context.closePath();
				this.context.restore();
			}

		};

		this.draw = function(interpolationPercent) {

			//context = canvas.getContext("2d");

			this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			this.drawShip(interpolationPercent);
			this.drawBullet(interpolationPercent);

			//context.fillStyle = "rgb(100, 200, 120)";
			//context.fillRect(10, 10, 50, 50);

			//app.bullet.render();

			//app.player.sailRender();

			//window.requestAnimationFrame(app.draw);
		};

		this.init();

	};

			//sailAngle : 0,
			//sailMaxAngle : 40,
			//sailRotate : function(value) {
			//    if (Math.abs(this.sailAngle + value) <= this.sailMaxAngle) {
			//        this.sailAngle += value;
			//    }
			//},
			//sailRender : function() {
			//    //context.fillStyle = "black";
			//    context.save();
			//    context.translate(this.x, this.y);
			//    context.lineCap = "round";
			//    context.rotate(Math.PI/180 * (this.angle + this.sailAngle));
			//    context.lineWidth = 2;
			//    context.beginPath();
			//    context.moveTo(0, 0);
			//    context.lineTo(-40, 0);
			//    context.stroke();
			//    context.restore();
			//}

	Canvas.prototype.init = function() {
		app.game = new app.Game();
		//app.mainLoop.start();
	};

	app.Canvas = Canvas;

	return Canvas.Canvas;

}).call(window.is7 = window.is7 || {});

var fpsCounter = document.getElementById('fpsCounter'),
	fpsValue = document.getElementById('fpsValue');

function end(fps, panic) {
	fpsCounter.textContent = parseInt(fps, 10) + ' FPS';
	if (panic) {
		// This pattern introduces non-deterministic behavior, but in this case
		// it's better than the alternative (the application would look like it
		// was running very quickly until the simulation caught up to real
		// time). See the documentation for `MainLoop.setEnd()` for additional
		// explanation.
		var discardedTime = Math.round(MainLoop.resetFrameDelta());
		console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
	}

}

function update(delta) {
	is7.canvas.update(delta);
}

function draw(interpolationPercentage) {
	is7.canvas.draw(interpolationPercentage);
}

MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start(window.is7.canvas = new window.is7.Canvas());