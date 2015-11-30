'use strict';

var Game = function () {

    var self = this,
        canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    this.player = {
        x : 50,
        y : 50,
        speed : 0,
        angle : 45,
        rotationMultiplier: 0,
        rotationIndex : function(value) {
            var rotationLimit = 0.5;

            if (!arguments.length) return this.rotationMultiplier;

            if (Math.abs(this.rotationMultiplier + value) < rotationLimit) {
                this.rotationMultiplier = Math.round((this.rotationMultiplier += value) * 1000) / 1000;
            }
        },
        fire : function() {
            if(self.bullet.alive) return;
            self.bullet.x = this.x;
            self.bullet.y = this.y;
            self.bullet.playerAngle = this.angle;
            self.bullet.alive = true;
        },
        calculatePosition: function() {
            this.x += this.speed * Math.cos(Math.PI/180 * (this.angle));
            this.y += this.speed * Math.sin(Math.PI/180 * (this.angle));
            this.angle += this.rotationIndex();
        },
        render: function(){
            this.calculatePosition();
            // save current context state
            context.save();
            //move context to players coordinates
            context.translate(this.x, this.y);
            //rotate context to a new angle
            context.rotate(Math.PI/180 * this.angle);
            //draw player's boat
            context.drawImage(self.boat, -(self.boat.width/2), -(self.boat.height/2));
            //restore context
            context.restore();
        },
        sail : {
            x : 0,
            y : 0,
            angle : 0,
            calculatePosition : function() {

            },
            render : function() {

            }
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
            this.calculatePosition();
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
        self.player.render();
        self.bullet.render();

        window.requestAnimationFrame(self.draw);
    };

    this.init = function() {
        self.boat = new Image();
        self.boat.src = "boat.svg";

        window.addEventListener("keydown", self.keypressHandler, false);
        //window.addEventListener("keyup", keyupHandler, false);
        window.requestAnimationFrame(self.draw);
    };

    this.keypressHandler = function(event) {

        console.log(event.keyCode);
        if (event.keyCode == 87) {
            //increase speed
            self.player.speed += 0.05;
        }
        if (event.keyCode == 83) {
            //decrease speed
            self.player.speed -= 0.05;
        }
        if (event.keyCode == 65) {
            //rotation to the left
            self.player.rotationIndex(-0.025);
        }
        if (event.keyCode == 68) {
            //rotation to the right
            self.player.rotationIndex(+0.025);
        }
        if (event.keyCode == 32) {
            //prevent space button default browser behaviour
            event.preventDefault();
            //fire
            self.player.fire();
        }
        if (event.keyCode == 49) {
            //left side ready to shoot
            self.bullet.setBulletAngle(-90);
        }
        if (event.keyCode == 50) {
            //right side ready to shoot
            self.bullet.setBulletAngle(90);
        }

    };
};

var game = new Game();
game.init();
