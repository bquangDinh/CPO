var panelEnum = {
	PLAYER_CONTROL_PANEL:1,
	RANKING_BOARD_PANEL:2,
	TIMING_BOARD_PANEL:3,
	ELECTRONIC_BOARD_CONTROL_PANEL:4,
	AUTHOR_PANEL:5,
	SETTINGS_PANEL:6,
	DEFAULT_PANEL:7
};

var currentPanel = panelEnum.DEFAULT_PANEL;
var oldPanel = null;

function backtoDefaultPanel(){
	if(currentPanel != panelEnum.DEFAULT_PANEL){
		controlPanelById(currentPanel,"none");
		oldPanel = currentPanel;
		currentPanel = panelEnum.DEFAULT_PANEL;
	}else{
		if(oldPanel != null){
			showPanelById(oldPanel);
			currentPanel = oldPanel;
		}
	}
}

function showPanelById(panelID){
	if(currentPanel != panelEnum.DEFAULT_PANEL){
		$("#pn" + currentPanel).css("z-index","0");
		$("#pn" + currentPanel).css("display","none");
		$("#pn" + panelID).css("z-index","1");
		$("#pn" + panelID).css("display","block");
	}else{
		$("#pn" + panelID).css("z-index","1");
		$("#pn" + panelID).css("display","block");
	}

	currentPanel = panelID;
}

function controlPanelById(panelID,controlKey){
	$("#pn" + panelID).css("display",controlKey);
}