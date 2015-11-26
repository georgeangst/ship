'use strict';

var Game = function () {

    var self = this;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    this.player = {
        x : 50,
        y : 50,
        speed : 0,
        angle : 45,
        rotationMultiplier: 0,
        rotationIndex : function(value) {
            var rotationLimit = 1;

            if (!arguments.length) return this.rotationMultiplier;

            if (Math.abs(this.rotationMultiplier + value) < rotationLimit) {
                this.rotationMultiplier = Math.round((this.rotationMultiplier += value) * 1000) / 1000;
            }

        },
        calculateNextMove: function() {
            this.x += this.speed * Math.cos(Math.PI/180 * (this.angle));
            this.y += this.speed * Math.sin(Math.PI/180 * (this.angle));
            this.angle += this.rotationIndex();

            //save bullet state
            if (!self.bullet.alive) {
                self.bullet.x = this.x;
                self.bullet.y = this.y;
                self.bullet.angle = this.angle;
            }

        },
        render: function(){
            // save current context state
            context.save();
            //move context to players coordinates
            context.translate(self.player.x, self.player.y);
            //rotate context to a new angle
            context.rotate(Math.PI/180 * self.player.angle);
            //draw player's boat
            context.drawImage(self.boat, -(self.boat.width/2), -(self.boat.height/2));
            //restore context
            context.restore();
        }

    };

    this.bullet = {
        alive : false,
        x : 0,
        y : 0,
        speed : 10,
        angle : 0,
        side: 1, //1 - left, 2 - right
        calculateNextMove: function() {
            if (this.alive) {
                if (this.side == 1) {
                    this.x += this.speed * Math.cos(Math.PI/180 * (this.angle - 90));
                    this.y += this.speed * Math.sin(Math.PI/180 * (this.angle - 90));
                }
                else if (this.side == 2) {
                    this.x += this.speed * Math.cos(Math.PI/180 * (this.angle + 90));
                    this.y += this.speed * Math.sin(Math.PI/180 * (this.angle + 90));
                }

            }
        },
        render: function() {
            context.save();
            //move context to players coordinates
            context.translate(this.x, this.y);
            //rotate context to a new angle
            context.rotate(Math.PI/180 * this.angle);
            //draw player's boat
            context.beginPath();
            context.arc(0, 0, 2, 0, Math.PI*2);

            context.fillStyle = "#000";
            context.fill();
            context.closePath();
            //restore context
            context.restore();
        }
    };

    this.draw = function() {
        //context = canvas.getContext("2d");
        context.clearRect(0, 0, 1000, 600);

        //context.fillStyle = "rgb(100, 200, 120)";
        //context.fillRect(10, 10, 50, 50);
        self.player.calculateNextMove();
        self.player.render();
        self.bullet.calculateNextMove();
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
            event.preventDefault();
            //fire
            self.bullet.alive = true;
        }
        if (event.keyCode == 49) {
            //left side ready to shoot
            self.bullet.side = 1;
        }
        if (event.keyCode == 50) {
            //right side ready to shoot
            self.bullet.side = 2;
        }

    };
};

var game = new Game();
game.init();
