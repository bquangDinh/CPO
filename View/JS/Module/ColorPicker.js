"use strict";
module.exports = class ColorPicker{
	constructor(canv,output_tb,output_review){
		this.canv = canv;
		this.output_tb = output_tb;
		this.output_review = output_review;
		this.image = null;

		/*private*/
		this.getPxInfo = (function(){
			var _c = null;
			return {
				getCanvas: function(c){
					_c = c;
				},
				getPixel: function(index){
					var ctx = _c.getContext("2d");
					var imgData = ctx.getImageData(0,0,_c.width,_c.height);
					
					/*imgData contains pixel info as 1-D array
					1 pixel return 4 elements in array (r,g,b,a) => index*4*/
					var i = index*4; 
					var d = imgData.data;
					return [d[i],d[i+1],d[i+2],d[i+3]];
				},
				getPixelXY:function(x,y){
					var ctx = _c.getContext("2d");
					var imgData = ctx.getImageData(0,0,_c.width,_c.height);
					var index = y*imgData.width + x;
					var d = imgData.data;
					var i = index*4;
					return [d[i],d[i+1],d[i+2],d[i+3]];
				}
			}
		})();
	}

	ColorPickerImage(image){
		this.image = image;
	}

	InitColorPicker(){
		if(this.image != null){
			var mouse = require("mouse-position");
			var color = require("../Module/Color.js");

			var ctx = this.canv.getContext("2d");
			ctx.drawImage(this.image,0,0);

			//get mouse position
			var mousePos = mouse(this.canv);

			var that = this;
			this.canv.addEventListener("click",function(e){
				that.getPxInfo.getCanvas(that.canv);
				var rgb = that.getPxInfo.getPixelXY(parseInt(mousePos[0]),parseInt(mousePos[1]));
				var hex = color.RGB2HTML(rgb[0],rgb[1],rgb[2]);
				that.output_tb.value = hex;
				that.output_review.style.backgroundColor = hex;
			});
		}
	}
}