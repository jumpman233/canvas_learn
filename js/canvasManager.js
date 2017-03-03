
function CanvasManager(id) {
	this.id = id;
	if(document.getElementById(id)){
		this.context = document.getElementById(id).getContext('2d');
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;
	}
}
CanvasManager.prototype.expandToFullScreen = function() {
	this.context.canvas.width = window.innerWidth;
	this.context.canvas.height = window.innerHeight;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};
CanvasManager.prototype.autoFixToScreen = function () {
	var context = this;
	document.getElementsByTagName('body')[0].onresize = function () {
		context.expandToFullScreen();
	};
}
CanvasManager.prototype.clearScreen = function () {
	this.context.clearRect(0,0,this.width,this.height);
}
module.exports = CanvasManager;