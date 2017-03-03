
function Ball(params) {
	this.radius = 40;
	this.color = 'rgba(255,255,255,1)';
	this.rotate = 0;
	this.x = 0;
	this.y = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.lineWidth = 1;
	if(params){
		if(params.radius){
			this.radius = params.radius;
		}
		if(params.color){
			this.color = params.color;
		}
	}
}

Ball.prototype.draw = function(ctx) {
	var ball = this;
	ctx.save();
	ctx.translate(ball.x, ball.y);
	ctx.rotate(ball.rotate);
	ctx.scale(ball.scaleX, ball.scaleY);
	ctx.fillStyle = ball.color;
	ctx.strokeStyle = ball.color;
	ctx.lineWidth = ball.lineWidth;
	ctx.beginPath();
	ctx.arc(0, 0, ball.radius, 0, Math.PI*2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
};

module.exports = Ball;