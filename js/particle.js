function Partical(params) {
	this.speed = 0;
	this.direction = 0;
	this.accSpeed = 0;
	this.radius = 20;
	this.color = 'rgb(255,0,0)';
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.loss = 0.8;

	if(params){
		if(params.radius>0){
			this.radius = params.radius;
		}
	}
}

Partical.prototype.constructor = Partical;
Partical.prototype.draw = function(ctx) {
	var partical = this;
	ctx.save();
	ctx.translate(partical.x, partical.y);
	ctx.rotate(partical.direction / 180 * Math.PI);
	ctx.fillStyle = partical.color;
	ctx.strokeStyle = partical.color;
	ctx.beginPath();
	ctx.arc(0, 0, partical.radius, 0, Math.PI*2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	partical.checkCollideBoundary(ctx);
	partical.move();
};
Partical.prototype.move = function () {
	var partical = this;
	partical.vx += partical.ax;
	partical.vy += partical.ay;
	partical.x += partical.vx;
	partical.y += partical.vy;
};
Partical.prototype.checkCollideParticle = function (p2) {
	
};
Partical.prototype.checkCollideBoundary = function(ctx) {
	var partical = this;
	while(partical.y - partical.radius < 0 ||
	 partical.y + partical.radius > ctx.canvas.height ||
	 partical.x - partical.radius < 0 || 
	 partical.x + partical.radius > ctx.canvas.width){
	 	//left
	 	if(partical.x - partical.radius < 0){
	 		partical.x += partical.radius - partical.x;
	 		partical.vx = -partical.vx * partical.loss;
	 		partical.vy = partical.vy * partical.loss;
	 	}
	 	//top
	 	else if(partical.y - partical.radius < 0){
	 		partical.y += partical.radius - partical.y;
			partical.direction = 180 - partical.direction;
			partical.vx = partical.vx * partical.loss;
			partical.vy = -partical.vy * partical.loss;
	 	}
	 	//right 
	 	else if(partical.x + partical.radius > ctx.canvas.width){
	 		partical.x -= (partical.x + partical.radius - ctx.canvas.width);
			partical.vx = -partical.vx * partical.loss;
			partical.vy = partical.vy * partical.loss;
	 	}
	 	//bottom 
	 	else if(partical.y + partical.radius > ctx.canvas.height){
	 		partical.y -= (partical.y + partical.radius - ctx.canvas.height);
	 		partical.vx = partical.vx * partical.loss;
	 		partical.vy = -partical.vy * partical.loss;
	 	}
	}
	while(partical.direction >= 360){
		partical.direction -= 360;
	}
	while(partical.direction < 0){
		partical.direction += 360;
	}
};
module.exports = Partical;