"use strict";
module.exports = class SoundController{
	constructor(sound_path){
		this.sound_path = sound_path;
	}

	PlaySound(){
		var audio = new Audio(this.sound_path);
		audio.play();
	}
}