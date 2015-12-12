'use strict';

(function() {

    var app = this;

    var Bullet = function(config) {

        this.x = 0;
        this.y = 0;
        this.angle = 0; //player's course
        this.lastX = this.x;
        this.lastY = this.y;
        this.speed = 0.3;
        this.theta = 0;
        this.direction = -90; //-90 : left, 90 : right,
        this.bulletColor = "#000";

        this.init(config);
    };

    Bullet.prototype.init = function(config) {
        for (var prop in config) {
            this[prop] = config[prop];
        }
    };

    //Bullet.prototype.setBulletAngle = function(value) {
    //    if (!this.alive) {
    //        this.angle = value;
    //    }
    //};

    Bullet.prototype.update = function(delta) {

        this.theta = this.speed * delta;
        //check if bullet is inside visible part of the canvas
        //if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        //    this.alive = false;
        //}

        this.x += this.theta * Math.cos(Math.PI/180 * (this.angle + this.direction));
        this.y += this.theta * Math.sin(Math.PI/180 * (this.angle + this.direction));

    };

    app.Bullet = Bullet;

return app.Bullet;

}).call(window.is7 = window.is7 || {});