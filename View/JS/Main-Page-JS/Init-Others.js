function InitColorPicker(){
	var img = document.getElementById("color-picker-source");
	var ColorPicker_MD = require("../JS/Module/ColorPicker");

	//player board field color picker
	let rk_output = document.getElementById("rk-color-input");
	let rk_box_review = document.getElementById("rk-color-result");
	let rk_canvas = document.getElementById("rk-cv-color-picker");
	var ColorPicker_RK = new ColorPicker_MD(rk_canvas,rk_output,rk_box_review);
	ColorPicker_RK.ColorPickerImage(img);
	ColorPicker_RK.InitColorPicker();

	var result_lighting = document.getElementById("result");

	for(var i = 0; i < 4;i++){
		let es_output = document.getElementById("es-color-input-" + (i+1));
		let es_box_review = document.getElementById("es-color-result-" + (i+1));
		let es_canvas = document.getElementById("es-cv-color-picker-" + (i+1));

		var ColorPicker_ES = new ColorPicker_MD(es_canvas,es_output,es_box_review);
		ColorPicker_ES.ColorPickerImage(img);
		ColorPicker_ES.InitColorPicker();						
	}	
}

InitColorPicker();

var message_element = document.getElementById("message");

document.getElementById("pn1-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Xem và điều khiển các thí sinh";
},false);

document.getElementById("pn2-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Các thiết lập về màn hình hiển thị bảng điểm";
},false);

document.getElementById("pn3-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Hiệu năng phần mềm";
},false);

document.getElementById("pn4-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Xem và điều khiển hệ thống đèn led";
},false);

document.getElementById("pn5-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Về tác giả";
},false);

document.getElementById("pn6-btt").addEventListener('mouseover',function(e){
	message_element.innerHTML = "Các thiết lập khác";
},false);
