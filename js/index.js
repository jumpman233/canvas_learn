
var basic = require('./graphicBasic.js')
var CanvasContext = require('./canvasContext.js');
var Arrow = require('./arrow.js');

var canvasContext = new CanvasContext('ca');
canvasContext.expandToFullScreen();
canvasContext.autoFixToScreen();
var arrow = new Arrow();

arrow.setPos(canvasContext.width/2 , canvasContext.height/2);

arrow.addMouseMove(canvasContext.context);
