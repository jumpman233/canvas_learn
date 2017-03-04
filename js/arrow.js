var util = require('./util.js');

function Arrow() {
	this.pos = {
		x: 0,
		y: 0
	}

	this.target = {
		x: 0,
		y: 0
	}
	this.direction = 0;
}

Arrow.prototype.draw = function(ctx) {
	var arrow = this;
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.save();
	ctx.translate(arrow.x,arrow.y);
	ctx.rotate(arrow.direction);
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.moveTo(20,20);
	ctx.lineTo(-20,20);
	ctx.lineTo(-20,-20);
	ctx.lineTo(-30,-20);
	ctx.lineTo(0,-40);
	ctx.lineTo(30,-20);
	ctx.lineTo(20,-20);
	ctx.lineTo(20,20);
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.restore();
};
Arrow.prototype.setPos = function(pos) {
	var arrow = this;
	if(arguments.length == 2){
		arrow.x = arguments[0];
		arrow.y = arguments[1];
	} else if(arguments.length == 1 && pos.x !== undefined && pos.y !== undefined){
		arrow.x = pos.x;
		arrow.y = pos.y;
	}
};
Arrow.prototype.addMouseMove = function(ctx) {
	var arrow = this;
	arrow.mouseMove = function (event) {
		arrow.target = util.getMousePos(event);
		arrow.direction = util.includeAngle(arrow.x, arrow.y, arrow.target.x, arrow.target.y);
		arrow.draw(ctx);
	};
	document.addEventListener('mousemove',arrow.mouseMove);
};
Arrow.prototype.removeMouseMove = function() {
	if(this.mouseMove){
		document.removeEventListener('mousemove', this.mouseMove);
	}
};

module.exports = Arrow;