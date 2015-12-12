'use strict';

(function() {

    var app = this;
    var instance;

    var Game = function() {

        if(instance !== undefined) {
            return instance;
        }

        instance = this;

        this.players = [];
        this.bullets = [];

        this.init();

    };

    Game.prototype.addPlayer = function(config) {
        this.players.push(new app.Ship(config));
    };

    Game.prototype.init = function() {

        app.boat = new Image();
        app.boat.src = "boat.svg";
        //debugger;

        this.addPlayer({
            id : 1,
            x : 50,
            y : 50,
            angle : 45
        });

        this.addPlayer({
            id: 2,
            x: 250,
            y: 250,
            angle: 0
        });

        window.addEventListener("keydown", this.keypressHandler, false);
        //window.addEventListener("keyup", keyupHandler, false);
        //window.requestAnimationFrame(app.draw);

        document.getElementById('fps').addEventListener('input', function() {
            fpsValue.textContent = Math.round(this.value);
        });

        document.getElementById('fps').addEventListener('change', function() {
            var val = parseInt(this.value, 10);
            MainLoop.setMaxAllowedFPS(val === 60 ? Infinity : val);
        });
    };

    Game.prototype.keypressHandler = function(event) {

        console.log(event.keyCode);
        if (event.keyCode == 87) {
            //increase speed
            app.game.players[0].changeSpeed(0.001);
        }
        if (event.keyCode == 83) {
            //decrease speed
            app.game.players[0].changeSpeed(-0.001);
        }
        if (event.keyCode == 65) {
            //rotation to the left
            app.game.players[0].turn(-0.01);
        }
        if (event.keyCode == 68) {
            //rotation to the right
            app.game.players[0].turn(+0.01);
        }
        if (event.keyCode == 32) {
            //prevent space button default browser behaviour
            event.preventDefault();
            //fire
            app.game.players[0].fire();
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

    app.Game = Game;

    return Game.Game;

}).call(window.is7 = window.is7 || {});