"use strict";
module.exports = class ServerGateGuard{
	constructor(){

	}

	AssignAddress(){
		var randomInRange = (from,to) => {
 			var r = Math.random();
 			return Math.floor(r * (to - from) + from);
 		}

 		var address = randomInRange(100,999);
 		return address;
	}

	CheckAddress(guardData,socketAddress){

	}
}