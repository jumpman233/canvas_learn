
function CanvasContext(id) {
	this.id = id;
	if(document.getElementById(id)){
		this.context = document.getElementById(id).getContext('2d');
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;
	}
}
CanvasContext.prototype.expandToFullScreen = function() {
	this.context.canvas.width = window.innerWidth;
	this.context.canvas.height = window.innerHeight;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
};
CanvasContext.prototype.autoFixToScreen = function () {
	document.addEventListener('resize',function () {
		this.expandToFullScreen();
	})
}

module.exports = CanvasContext;