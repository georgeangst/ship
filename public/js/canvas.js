'use strict';

(function(){



    var app = this;

    var Canvas = function() {

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.update = function(delta) {

            app.player.update(delta);

            //app.bullet.update();
        };

        this.drawShip = function(interpolationPercentage) {
            var x = app.player.lastX + (app.player.x - app.player.lastX) * interpolationPercentage,
                y = app.player.lastY + (app.player.y - app.player.lastY) * interpolationPercentage,
                angle = app.player.lastAngle + (app.player.angle - app.player.lastAngle) * interpolationPercentage;
            this.context.save();
            //move context to players coordinates
            this.context.translate(x, y);
            //rotate context to a new angle
            this.context.rotate(Math.PI / 180 * angle);
            //draw player's boat
            this.context.drawImage(app.boat, -(app.boat.width / 2), -(app.boat.height / 2));
            //restore context
            this.context.restore();
        };

        this.draw = function(interpolationPercentage) {

            //context = canvas.getContext("2d");

            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawShip(interpolationPercentage);

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

    //this.bullet = {
    //    alive : false,
    //    x : 0,
    //    y : 0,
    //    speed : 10,
    //    theta : 0,
    //    playerAngle : 0,
    //    bulletAngle: -90, //-90 : left, 90 : right,
    //    bulletColor: "#000",
    //    setBulletAngle : function(value) {
    //        if (!this.alive) {
    //            this.bulletAngle = value;
    //        }
    //    },
    //    update: function(delta) {
    //
    //        this.theta += this.velocity * delta;
    //        //check if bullet is inside visible part of the canvas
    //        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
    //            this.alive = false;
    //        }
    //
    //        this.x += this.theta * Math.cos(Math.PI/180 * (this.playerAngle + this.bulletAngle));
    //        this.y += this.theta * Math.sin(Math.PI/180 * (this.playerAngle + this.bulletAngle));
    //
    //    },
    //    render: function() {
    //        if (!this.alive) return;
    //        context.save();
    //        //move context to bullet coordinates
    //        context.translate(this.x, this.y);
    //        //rotate context to a bullet trajectory angle
    //        //context.rotate(Math.PI/180 * this.shootAngle);
    //        //draw bullet
    //        context.beginPath();
    //        context.arc(0, 0, 2, 0, Math.PI*2);
    //        context.fillStyle = this.bulletColor;
    //        context.fill();
    //        context.closePath();
    //        //restore context
    //        context.restore();
    //    }
    //};



    Canvas.prototype.init = function() {
        this.game = new app.Game();
        //app.mainLoop.start();
    };

    this.keypressHandler = function(event) {

        console.log(event.keyCode);
        if (event.keyCode == 87) {
            //increase speed
            app.player.changeSpeed(0.001);
        }
        if (event.keyCode == 83) {
            //decrease speed
            app.player.changeSpeed(-0.001);
        }
        if (event.keyCode == 65) {
            //rotation to the left
            app.player.turn(-0.01);
        }
        if (event.keyCode == 68) {
            //rotation to the right
            app.player.turn(+0.01);
        }
        if (event.keyCode == 32) {
            //prevent space button default browser behaviour
            event.preventDefault();
            //fire
            app.player.fire();
        }
        if (event.keyCode == 49) {
            //left side ready to shoot
            app.bullet.setBulletAngle(-90);
        }
        if (event.keyCode == 50) {
            //right side ready to shoot
            app.bullet.setBulletAngle(90);
        }
        if (event.keyCode == 37) {
            //sail rotate to the left
            app.player.sailRotate(-1);
        }
        if (event.keyCode == 39) {
            //sail rotate to the left
            app.player.sailRotate(1);
        }

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