exports.RGB2HTML = function(r,g,b){
	var componentHex = function(c){
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	return "#" + componentHex(r) + componentHex(g) + componentHex(b);
}