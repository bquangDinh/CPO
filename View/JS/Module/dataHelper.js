exports.saveServerConfig = function(data,mode){
	const {app} = require('electron').remote;
	const fs = require('fs');

	const XMLWriter = require("../Lib/XMLWriter");
	var xmlWriter = new XMLWriter();
	const fileName = "server-config.xml";
	const savePath = app.getAppPath() + "\\Data\\" + fileName;

	if(typeof mode == "undefined"){
		mode = "a";
	}

	xmlWriter.BeginNode(data["server_name"]);
	xmlWriter.Node("port",data["server_port"]);
	xmlWriter.Node("ip",data["server_ip"]);
	xmlWriter.Node("type",data["type"]);
	xmlWriter.EndNode();

	var xmlConvertedString = xmlWriter.ToString();

	if(mode == "a"){
		//append data
		fs.appendFile(savePath,xmlConvertedString,(err) => {
		if (err){
			alert(err.message);
			return;
		}
	});
	}

	if(mode == "rw"){
		//rewrite data
		fs.writeFile(savePath,data,(err) => {
		if (err){
			alert(err.message);
			return;
		}
	});
	}
	
};

