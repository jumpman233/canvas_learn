function Util() {
	
}
Util.prototype.getMousePos = function(event) {
	return {
		x: event.layerX || event.offsetX,
		y: event.layerY || event.offsetY
	}
};
Util.prototype.includeAngle = function (startX, startY, desX, desY) {
	var dx = desX - startX;
	var dy = desY - startY;
	return Math.atan2(dy,dx) + Math.PI/2;
}
Util.prototype.distance = function (startX, startY, desX, desY) {
	var dx = desX - startX;
	var dy = desY - startY;
	return Math.sqrt(Math.pow(dx,2) + Math.pow(dy, 2));
}
Util.prototype.resolveColor = function (r, g, b, o) {
	if(arguments.length == 3){
		return "rgb(" + r + "," + g + "," + b + ")";
	} else if(arguments.length == 4){
		return "rgba(" + r + "," + g + "," + b + "," + o + ")";
	}
}
Util.prototype.randomColor = function () {
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	return this.resolveColor(r,g,b);
}
Util.prototype.getRed = function (rgb) {
	return parseInt(rgb.split(',')[0].split('(')[1]);
}
Util.prototype.getGreen = function (rgb) {
	return parseInt(rgb.split(',')[1]);
}
Util.prototype.getBlue = function (rgb) {
	return parseInt(rgb.split(',')[2].split(')')[0]);
}
module.exports = new Util();