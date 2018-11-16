module.exports = class PlayerBoardManager{
	constructor(player_list){
		this.player_list = player_list;
		this.PLAYER_COUNT = 4;
	}

	GetTime(data){
		for(var i = 0; i < this.PLAYER_COUNT ;i++){
			if(this.player_list[i].StopCounter == 0){
				this.player_list[i].CurrentTime = data.secs + "#" + data.percentage + "#" + data.total;
			}
		}
	}
}