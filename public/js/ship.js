'use strict';

(function() {

    var app = this;

    var Ship = function(config) {

        this.lastX = this.x;
        this.lastY = this.y;
        this.speed = 0;
        this.theta = 0;
        this.maxSpeed = 0.02;
        this.angle = 45;
        this.lastAngle = this.angle;
        this.rotationMultiplier = 0;

        this.init(config);
    };

    Ship.prototype.init = function(config) {

        for (var prop in config) {
            this[prop] = config[prop];
        }

    };

    Ship.prototype.update = function(delta) {
        this.lastX = this.x;
        this.lastY = this.y;
        this.lastAngle = this.angle;
        this.theta = this.speed * delta;
        this.x += this.theta * Math.cos(Math.PI / 180 * (this.angle));
        this.y += this.theta * Math.sin(Math.PI / 180 * (this.angle));
        this.angle += this.rotationMultiplier;
    };

    Ship.prototype.changeSpeed = function (value){
        if (Math.abs(this.speed + value) <= this.maxSpeed) {
            this.speed += value;
        }
    };

    Ship.prototype.turn = function(value) {
        var rotationLimit = 0.1;

        if (Math.abs(this.rotationMultiplier + value) <= rotationLimit) {
            this.rotationMultiplier = Math.round((this.rotationMultiplier += value) * 1000) / 1000;
        }
    };

    Ship.prototype.fire = function() {

        app.game.bullets.push(new app.Bullet({
            x : this.x,
            y : this.y,
            angle : this.angle,
            playerId : this.id
        }));

    };

    app.Ship = Ship;

    return app.Ship;

}).call(window.is7 = window.is7 || {});