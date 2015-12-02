'use strict';

var Game = function () {

    var app = this,
        canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    this.player = {
        x : 50,
        y : 50,
        speed : 0,
        maxSpeed : 0.1,
        changeSpeed : function(value) {
            console.log(value);
            if (Math.abs(this.speed + value) <= this.maxSpeed) {
              this.speed += value;
            }
        },
        angle : 45,
        rotationMultiplier: 0,
        turn : function(value) {
            var rotationLimit = 0.1;

            if (Math.abs(this.rotationMultiplier + value) <= rotationLimit) {
                console.log(this.rotationMultiplier)
                this.rotationMultiplier = Math.round((this.rotationMultiplier += value) * 1000) / 1000;
            }
        },
        fire : function() {
            if(app.bullet.alive) return;
            app.bullet.x = this.x;
            app.bullet.y = this.y;
            app.bullet.playerAngle = this.angle;
            app.bullet.alive = true;
        },
        calculatePosition: function() {
            this.x += this.speed * Math.cos(Math.PI/180 * (this.angle));
            this.y += this.speed * Math.sin(Math.PI/180 * (this.angle));
            this.angle += this.rotationMultiplier;
        },
        render: function() {
            this.calculatePosition();
            // save current context state
            context.save();
            //move context to players coordinates
            context.translate(this.x, this.y);
            //rotate context to a new angle
            context.rotate(Math.PI/180 * this.angle);
            //draw player's boat
            context.drawImage(app.boat, -(app.boat.width/2), -(app.boat.height/2));
            //restore context
            context.restore();
        },
        sailAngle : 0,
        sailMaxAngle : 40,
        sailRotate : function(value) {
            if (Math.abs(this.sailAngle + value) <= this.sailMaxAngle) {
                this.sailAngle += value;
            }
        },
        sailRender : function() {
            //context.fillStyle = "black";
            context.save();
            context.translate(this.x, this.y);
            context.lineCap = "round";
            context.rotate(Math.PI/180 * (this.angle + this.sailAngle));
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(-40, 0);
            context.stroke();
            context.restore();
        }


    };

    this.bullet = {
        alive : false,
        x : 0,
        y : 0,
        speed : 10,
        playerAngle : 0,
        bulletAngle: -90, //-90 : left, 90 : right,
        bulletColor: "#000",
        setBulletAngle : function(value) {
            if (!this.alive) {
                this.bulletAngle = value;
            }
        },
        calculatePosition: function() {
            //check if bullet is inside visible part of the canvas
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.alive = false;
            }

            this.x += this.speed * Math.cos(Math.PI/180 * (this.playerAngle + this.bulletAngle));
            this.y += this.speed * Math.sin(Math.PI/180 * (this.playerAngle + this.bulletAngle));

        },
        render: function() {
            if (!this.alive) return;
            context.save();
            //move context to bullet coordinates
            context.translate(this.x, this.y);
            //rotate context to a bullet trajectory angle
            //context.rotate(Math.PI/180 * this.shootAngle);
            //draw bullet
            context.beginPath();
            context.arc(0, 0, 2, 0, Math.PI*2);
            context.fillStyle = this.bulletColor;
            context.fill();
            context.closePath();
            //restore context
            context.restore();
        }
    };

    this.draw = function() {
        //context = canvas.getContext("2d");
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        //context.fillStyle = "rgb(100, 200, 120)";
        //context.fillRect(10, 10, 50, 50);
        app.player.calculatePosition();
        app.player.render();

        app.bullet.calculatePosition();
        app.bullet.render();

        app.player.sailRender();

        window.requestAnimationFrame(app.draw);
    };

    this.init = function() {
        app.boat = new Image();
        app.boat.src = "boat.svg";

        window.addEventListener("keydown", app.keypressHandler, false);
        //window.addEventListener("keyup", keyupHandler, false);
        window.requestAnimationFrame(app.draw);
    };

    this.keypressHandler = function(event) {

        console.log(event.keyCode);
        if (event.keyCode == 87) {
            //increase speed
            app.player.changeSpeed(0.01);
        }
        if (event.keyCode == 83) {
            //decrease speed
            app.player.changeSpeed(-0.01);
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
};

var game = new Game();
game.init();
