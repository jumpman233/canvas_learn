
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

console.log(document.getElementById('load-ball'))
document.getElementById('load-ball').onclick = function () {
	interval.remove();
	var b1 = new Ball({
		radius: 4,
		color: '#7FFFD4'
	});
	var b2 = new Ball({
		radius: 16,
		color: '#7FFFD4'
	});
	b1.x = cm.width/2;
	b1.y = cm.height/2;
	b2.x = cm.width/2;
	b2.y = cm.height/2;
	var ang = 0,
		dx = 0,
		dr = 0,
		dg = 0.1;

	b1.x -= Math.sin(Math.PI/2) * 200;
	b2.x += Math.sin(Math.PI/2) * 200;
	var draw = function () {
		context.clearRect(0,0,cm.width,cm.height);
		dx = Math.sin(ang) * 200;
		dr = Math.sin(ang) * 3;
		b1.radius = 6+dr;
		b2.radius = 6-dr;
		ang += dg;
		b1.x = cm.width/2 + dx;
		b2.x = cm.width/2 - dx;

		b1.draw(context);
		b2.draw(context);
	}
	window.setInterval(function () {
		draw();
	}, 40);
}