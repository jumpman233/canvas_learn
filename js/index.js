"use strict";
var basic = require('./graphicBasic.js')
var CanvasManager = require('./canvasManager.js');
var Arrow = require('./arrow.js');
var Ball = require('./ball.js');
var util = require('./util.js');
var Particle = require('./particle.js')

var cm = new CanvasManager('ca');
cm.expandToFullScreen();
cm.autoFixToScreen();
var context = cm.context;

var interval = {
	removeList: [],
	remove: function(){
		for(var i in this.removeList){
			var func = this.removeList[i];
			func();
		}
	}
}

//draw a arrow pointting mouse

var arrow = new Arrow();
document.getElementById('arrow').onclick = function () {
	interval.remove();
	cm.clearScreen();
	arrow.setPos(cm.width/2 , cm.height/2);

	arrow.addMouseMove(cm.context);
	interval.removeList.push(function () {
		arrow.removeMouseMove.call(arrow);
	});
}

//a ball move as sin
document.getElementById('sinBall').onclick = function () {
	interval.remove();
	console.log(interval.removeList);
	var ba = new Ball({
		radius: 5
	});
	ba.x = cm.width /  2;
	ba.y = cm.height / 2;
	var st = {
		x: ba.x,
		y: ba.y,
		ra: ba.radius
	}
	var ang = 0;
	var rAng = 0;
	var c1 = util.randomColor();
	var c2 = util.randomColor();
	var r1 = util.getRed(c1),
	 	g1 = util.getGreen(c1),
		b1 = util.getBlue(c1),
		r2 = util.getRed(c2),
		g2 = util.getGreen(c2),
		b2 = util.getBlue(c2);
	var dr = Math.round((r2 - r1)/60);
	var dg = Math.round((g2 - g1)/60);
	var db = Math.round((b2 - b1)/60);
	var r = r1,
		g = g1,
		b = b1;
	function draw(ctx) {
		ctx.clearRect(0,0,cm.width,cm.height);
		var color = util.resolveColor(Math.round(r),Math.round(g),Math.round(b));
		r += dr;
		g += dg;
		b += db;
		if(Math.abs(g-g1)>=Math.abs(g2-g1)||
			Math.abs(r-r1)>=Math.abs(r2-r1)||
			Math.abs(b-b1)>=Math.abs(b2-b1)){
			c1 = c2;

			c2 = util.randomColor();

			r1 = util.getRed(c1),
		 	g1 = util.getGreen(c1),
			b1 = util.getBlue(c1),

			r2 = util.getRed(c2),
			g2 = util.getGreen(c2),
			b2 = util.getBlue(c2);

			dr = (r2 - r1)/60;
			dg = (g2 - g1)/60;
			db = (b2 - b1)/60;

			while((r1 == r2 && g1 == g2 && b1 == b2) ||
				(dr == 0 && dg == 0 && db == 0)){
				c2 = util.randomColor();

				r2 = util.getRed(c2);
				g2 = util.getGreen(c2);
				b2 = util.getBlue(c2);

				dr = (r2 - r1)/60;
				dg = (g2 - g1)/60;
				db = (b2 - b1)/60;
			}


		    r = r1,
			g = g1,
			b = b1;
		}
		ba.color = color;
		ba.x = st.x + ang;
		ba.y = st.y + Math.sin(ang / 20)*50;
		if(ba.x >= cm.width){
			ba.x = ba.x % cm.width;
		}
		ang += 1;
		ba.radius = Math.sin(rAng) * 2 + st.ra;
		rAng += 0.1;
		ba.draw(ctx);
	}
	var a = window.setInterval(function () {
		draw(context);
	},20);
	interval.removeList.push(function () {
		window.clearInterval(a);
	})
}

//a
document.getElementById('phsics-ball').onclick = function () {
	interval.remove();
	context.clearRect(0, 0, cm.width, cm.height);
	var p1 = new Particle({
		radius: 20
	});
	p1.x = cm.width/2;
	p1.y = cm.height/2;
	p1.vx = 1;
	p1.vy = 1;
	p1.color = '#7fffd4';
	var p2 = new Particle({
		radius: 2
	});

	var posLast = {
		x: 0,
		y: 0
	}
	var posCur = {
		x: 0,
		y: 0
	}
	var posD = {
		x: 0,
		y: 0
	}
	var mouseDown = function(event){
		posLast = util.getMousePos(event);
		if(util.distance(posLast.x, posLast.y, p1.x, p1.y) <= p1.radius){
			posCur = posLast;
			context.canvas.addEventListener('mousemove', mouseMove);
			context.canvas.addEventListener('mouseup', mouseUp);
		}
	}
	var mouseMove = function(event){
		posLast = posCur;
		posCur = util.getMousePos(event);
		posD.x = posCur.x - posLast.x;
		posD.y = posCur.y - posLast.y;
		p1.vx = posD.x;
		p1.vy = posD.y;
		p1.x = posCur.x;
		p1.y = posCur.y;
	}
	var mouseUp = function(){
		context.canvas.removeEventListener('mouseup', mouseUp);
		context.canvas.removeEventListener('mousemove', mouseMove);
	}

	var intervala = window.setInterval(function () {
		context.clearRect(0, 0, cm.width, cm.height);
		p1.draw(context);

		context.save();
		context.translate(cm.width/2, 100);
		context.font = '20px Courier New';
		context.textAlign = 'center';
		context.fillStyle = '#fff';
		context.fillText('drag the ball and release your mouse', 0, 0);
		context.fillText('press key \'g\' and gravity will be added', 0, 25);
		context.restore();
	},20);

	context.canvas.addEventListener('mousedown', mouseDown);

	var intervalb = window.addEventListener('keydown', function (e) {
		if(e.keyCode == 71){
			if(p1.ay == 1){
				p1.ay = 0;
			} else{
				p1.ay = 1;
			}
		}
	})

	interval.removeList.push(function () {
		window.clearInterval(intervala);
		window.removeEventListener('keydown',intervalb);
		context.canvas.removeEventListener('mousedown', mouseDown);
	});
}

document.getElementById('load-ball').onclick = function () {
	interval.remove();
	var b1 = new Ball({
		radius: 10,
		color: '#7FFFD4'
	});
	var b2 = new Ball({
		radius: 10,
		color: '#7FFFD4'
	});
	b1.x = cm.width/2;
	b1.y = cm.height/2;
	b2.x = cm.width/2;
	b2.y = cm.height/2;
	var ang = 0,
		dx = 0,
		dr = 0,
		dg = 0.1,
		b1_x = cm.width/2,
		b2_x = cm.width/2;

	var draw = function () {
		context.clearRect(0,0,cm.width,cm.height);
		dx = Math.sin(ang) * 70;
		dr = Math.cos(ang) * 3;
		b1.radius = 6+dr;
		b2.radius = 6-dr;
		ang += dg;
		b1.x = b1_x + dx;
		b2.x = b2_x - dx;

		b1.draw(context);
		b2.draw(context);
	}
	var inter = window.setInterval(function () {
		draw();
	}, 20);
	interval.removeList.push(function () {
		window.clearInterval(inter);
	});
}

document.getElementById('energy-momentum').onclick = function () {
	interval.remove();
	var p1 = new Particle();
	var p2 = new Particle();
	p1.color = '#CCFFFF';
	p1.radius = 30;
	p1.mass = 10;
	p1.x = cm.width/2-100;
	p1.y = cm.height/2 + 50;
	p1.vy = 3;
	p1.vx = 30;
	p1.loss = 1;
	p2.color = '#99CCCC';
	p2.radius = 70;
	p2.mass = 20;
	p2.loss = 1;
	p2.x = cm.width/2+100;
	p2.y = cm.height/2;

	var draw = function () {
		context.clearRect(0, 0, cm.width, cm.height);
		p1.collide(p2);
		p1.draw(context);
		p2.draw(context);
	}

	var inter = window.setInterval(draw,30);
	interval.removeList.push(function () {
		window.clearInterval(inter);
	})
}

document.getElementById('easing-animation').onclick = function () {
	interval.remove();
	var ball = new Ball();
	ball.radius = 10;
	ball.color = '#CCFFFF';
	ball.x = cm.width/2;
	ball.y = cm.height/2;
	var dd = 0,
		easing = 0.1,
		pos = {x: cm.width / 2, y: cm.height / 2},
		ang = 0;

	var draw = function () {
		context.clearRect(0, 0, cm.width, cm.height);
		ball.draw(context);
		dd = util.distance(ball.x, ball.y, pos.x, pos.y);
		ang = util.includeAngle(ball.x, ball.y, pos.x, pos.y);
		ball.x += dd * Math.sin(ang) * easing;
		ball.y -= dd * Math.cos(ang) * easing;
	}
	context.canvas.addEventListener('mousemove', function (e) {
		pos = util.getMousePos(e);
	})
	var inter = window.setInterval(draw,20);
	interval.removeList.push(function () {
		window.clearInterval(inter);
	})
}

document.getElementById('spring-animation').onclick = function () {
	interval.remove();
	var balls = [];
	for(var i = 0; i < 3; i++){
		balls.push(new Particle({radius: 10, color: '#CCFFFF', loss: 1}));
	}
	var core = new Particle({radius: 20, color: '#0099CC', loss: 1, f: 0.95});
	balls[0].x = cm.width / 2 - 100;
	balls[0].y = cm.height / 2 - 100;
	balls[1].x = cm.width / 2 - 100;
	balls[1].y = cm.height / 2 + 100;
	balls[2].x = cm.width / 2 + 100;
	balls[2].y = cm.height / 2 - 100;
	core.x = cm.width / 2 + 50;
	core.y = cm.height / 2 + 50;
	var clickBall = null,
		spring = 0.02,
		f = 0.95;

	var drawLines = function () {
		balls.forEach(function (ball) {
			util.drawLine(ball.x, ball.y, core.x, core.y, context, 2, '#CCCC99');
		})
	}
	var mouseDown = function (event) {
		var pos = util.getMousePos(event);
		balls.forEach(function (ball) {
			if(ball.isIn(pos.x, pos.y)){
				clickBall = ball;
				context.canvas.addEventListener('mousemove', mouseMove);
				context.canvas.addEventListener('mouseup', mouseUp);
			}
		})
	}
	var mouseMove = function (event) {
		var pos = util.getMousePos(event);
		clickBall.x = pos.x;
		clickBall.y = pos.y;
	}
	var mouseUp = function () {
		context.canvas.removeEventListener('mousemove', mouseMove);
		context.canvas.removeEventListener('mouseup', mouseUp);
	}

	var handle = function (ball) {
		var dx = ball.x - core.x,
			dy = ball.y - core.y;
		var ax = dx * spring,
			ay = dy * spring;
		core.ax += ax;
		core.ay += ay;
	}
	var draw = function () {
		context.clearRect(0, 0, cm.width, cm.height);

		core.ax = 0;
		core.ay = 0;
		balls.forEach(handle);


		drawLines();
		balls[0].draw(context);
		balls[1].draw(context);
		balls[2].draw(context);
		core.draw(context);
	}
	context.canvas.addEventListener('mousedown', mouseDown);

	var inter = window.setInterval(draw, 40);


	interval.removeList.push(function () {
		window.clearInterval(inter);
		context.canvas.removeEventListener('mousedown', mouseDown);
	});
}