
/*DEFAULT VALUE HERE*/
DEFAULT_COLOR = "#25AAE1";
DEFAULT_LINEWIDTH = 5;

/*DRAW METHODS*/
function drawRoundRect(ctx,x,y,width,height,radius,fill,fillStyle,stroke,strokeStyle,lineWidth){
  /*
  ctx: the canvas to draw on it

  x: start point to draw the rectangle
  y: start point to draw the rectangle

  width: width of the rectangle
  height: height of the rectangle

  fill: if true -> fill the rectangle
  fillStyle: fill color

  stroke: if true -> stroke corner of the rectangle
  strokeStyle: stroke color
  lineWidth: stroke thickness

  */

  // if variable is null -> set default value to the variable
  if(typeof stroke == "undefined"){
    stroke = false;
  }

  if(typeof fill == "undefined"){
    fill = false;
  }

  if(typeof strokeStyle == "undefined"){
    strokeStyle = DEFAULT_COLOR; 
  }

  if(typeof lineWidth == "undefined"){
    lineWidth = DEFAULT_LINEWIDTH;
  }

  if(typeof fillStyle == "undefined"){
    fillStyle = DEFAULT_COLOR;
  }

  if(typeof radius == "undefined"){
    radius = 5;
  }

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  //Draw here
  ctx.beginPath();

  ctx.moveTo(x + radius,y);
  ctx.lineTo(x + width - radius,y);
  ctx.quadraticCurveTo(x + width,y,x + width,y + radius);

  ctx.lineTo(x + width,y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

  ctx.lineTo(x + radius,y + height);
  ctx.quadraticCurveTo(x,y + height,x,y + height - radius);

  ctx.lineTo(x,y + radius);
  ctx.quadraticCurveTo(x,y,x + radius,y);

  ctx.closePath();

  if(stroke){
    ctx.stroke();
  }

  if(fill){
    ctx.fill();
  }
}

function drawLine(ctx,x0,y0,x1,y1,stroke,strokeStyle,lineWidth){
  /*
  ctx: the canvas to draw on it

  x0 : start point to draw
  y0 : start point to draw

  x1: end point to draw
  y1: end point to draw

  stroke: if true -> stroke the line
  strokeStyle: stroke color
  lineWidth: line thickness
  */

  //if variable is null -> set default value to the variable
  if(typeof stroke == "undefined"){
    stroke = true;
  }

  if(typeof strokeStyle == "undefined"){
    strokeStyle = DEFAULT_COLOR;   
  }

  if(typeof lineWidth == "undefined"){
    lineWidth = DEFAULT_LINEWIDTH;   
  }

  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;

  //Draw Here
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.closePath();

  if(stroke){
    ctx.stroke();
  }
}

function drawCircle(ctx,centerX,centerY,radius,startAngle,endAngle,fill,fillStyle,stroke,strokeStyle,lineWidth){
  /*
  ctx: the canvas to draw on it

  centerX: center point
  centerY: center point
  
  radius: radius of the circle
  
  startAngle: start angle to draw
  endAngle: end angle to draw

  fill: if true -> fill the circle
  fillStyle: fill color

  stroke: if true -> stroke corner of the circle
  strokeStyle: stroke color

  lineWidth: stroke thickness 
  */

  //if variable is null -> set default value to the variable
  if(typeof radius == "undefined"){
    radius = 5;
  }

  if(typeof fill == "undefined"){
    fill = false;
  }

  if(typeof fillStyle == "undefined"){
    fillStyle = DEFAULT_COLOR;
  }

  if(typeof stroke == "undefined"){
    stroke = false;
  }

  if(typeof strokeStyle == "undefined"){
    strokeStyle = DEFAULT_COLOR;
  }

  if(typeof lineWidth == "undefined"){
    lineWidth = DEFAULT_LINEWIDTH;
  }

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;

  //Draw here
  ctx.beginPath();

  ctx.arc(centerX,centerY,radius,startAngle,endAngle);

  ctx.closePath();

  if(fill){
    ctx.fill();
  }

  if(stroke){
    ctx.stroke();
  }
}

function drawCanvasUI(){
  var canvas = document.getElementById("server-configure-canvas");
  var ctx = canvas.getContext("2d");

  //server config 1 place
  drawRoundRect(ctx,236,100,180,180,10,null,null,true,DEFAULT_COLOR,5);

  drawLine(ctx,241,290,411,290);

  drawLine(ctx,326,290,326,520);

  drawCircle(ctx,326,290,22,0,2*Math.PI,true,"#726659");

  //server config 0 place
  drawRoundRect(ctx,436,100,180,180,10,null,null,true,DEFAULT_COLOR,5);

  drawLine(ctx,441,290,611,290);

  drawLine(ctx,526,290,526,520);

  drawCircle(ctx,526,290,22,0,2*Math.PI,true,"#726659");

  //server config 2 place
  drawRoundRect(ctx,636,100,180,180,10,null,null,true,DEFAULT_COLOR,5);

  drawLine(ctx,641,290,811,290);

  drawLine(ctx,726,290,726,520);

  drawCircle(ctx,726,290,22,0,2*Math.PI,true,"#726659");  
}

drawCanvasUI();






