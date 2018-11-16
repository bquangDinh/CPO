exports.checkHostFormat = function(host_input){
	return /\d{3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host_input);
}

exports.checkPortFormat = function(port_input){
	return /^\d{4}$/.test(port_input);
}

exports.isNumberic = function(string){
	return /\d+/.test(string);
}

exports.isHexColor = function(string){
	return /^#[0-9A-F]{6}$/i.test(string);
}

exports.convertAsciiArrayToText = function(ascii_array){
	var count = ascii_array.length;
	var result = "";
	for(i = 0; i < count;i++){
		var character = String.fromCharCode(ascii_array[i]);
		result += character;
	}

	return result;
}
