var windowHeight = 0;
$(window).on("load",function(){
	//when everything have been loaded
	$(".resize-element").height($(window).height() - $("#control-area").height());
});

function resize(){
	const {remote} = require('electron');
	const {BrowserWindow} = remote;
	let _win = BrowserWindow.getFocusedWindow();
	$(".resize-element").height(_win.getSize()[1] - $("#control-area").height());
	windowHeight = _win.getSize[1];
}