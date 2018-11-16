"use strict";

module.exports = class AlarmRanking{
	constructor(){
		this.ranking = [null,null,null,null];
	}

	SetConfigById(newConfig,index){
		this.ranking[index] = newConfig;
	}

	ClearRanking(){
		this.ranking = [null,null,null,null];
	}
}