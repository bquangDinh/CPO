"use strict";
module.exports = class PlayerManager{
	constructor(players){
		this.players = players;
		this.sockets = [null,null,null,null];

		this.actions = {
			CAU_TRA_LOI:'GCTL',
			CHUONG:'GC'
		}
		this.PLAYER_COUNT = 4;

		/*Properties to communicate to server*/
		this.socket = [null,null,null,null];
		this._type = 'adapter';
		this.signature = 'PLM';
		this.sendSignal = {
			LOCK:1,
			UNLOCK:2,
			SCORE:3,
			TIME:4,
			DISALR:5,
			UNDISALR:6
		}

		/*Init Events*/
        var event = require('events');
        this.eventEmitter = new event.EventEmitter();


		/*PRIVATE METHODS*/

		this.FindPlayerByID = function(player_id){
			for(var i = 0; i < this.PLAYER_COUNT;i++){
				if(this.players[i].ID == player_id){
					return i;
				}
			}
		}.bind(this);

		this.GetAvailableSeat=  function(player_id,player_name){
			if(this.players[player_id].Status == "Offline"){
				this.players[player_id].Status = "Online";
				this.players[player_id].Name = player_name;
				return true;
			}

			return false;
		}.bind(this);

		this.SendDataToPlayer = function(data,socket){
			//extract data
			var elements = data.split('^');
			var player_id = elements[0];
			var action = elements[1];

			if(action == this.actions.CAU_TRA_LOI){
				var answer_content = data.substring(player_id.length + action.length + 2,data.length);
				this.players[player_id].Answer = answer_content;
				//this.players[player_id].StopCounter = 1;
				this.players[player_id].Time = this.players[player_id].currentTime;
			}

			if(action == this.actions.CHUONG){
				//stop counter
				this.players[player_id].StopCounter = 1;
				this.players[player_id].Alarm();
			}
		}.bind(this);


		//begin listening from player

		var that = this;
		var init_players_listener = function(index){
			players[index].eventEmitter.on('send-abroad',function(data){
				var propertiesName = data.substring(0,3);
				var value = data.substring(3,data.length);

				if(that.sockets.length != 0){
					var socket = null;
					//find socket
					for(var i = 0; i < 4;i++){
						if(that.sockets[i] != null){
							if(that.sockets[i].id == index){
								socket = that.sockets[i].socket;
								break;
							}
						}			
					}

					if(socket != null && socket.destroyed == false){
						if(propertiesName == that.players[index].PROPERTIES_NAME.LOCK){
							if(value == '1'){
								that.SendDataToServer(that.sendSignal.LOCK + "*",socket);
							}else{
								that.SendDataToServer(that.sendSignal.UNLOCK + "*",socket);
							}
						}
						if(propertiesName == that.players[index].PROPERTIES_NAME.SCORE){
							that.SendDataToServer(that.sendSignal.SCORE + "*" + value,socket);
						}

						if(propertiesName == that.players[index].PROPERTIES_NAME.CURRTIME){
							that.SendDataToServer(that.sendSignal.TIME + "*" + value,socket)
						}

						if(propertiesName == that.players[index].PROPERTIES_NAME.DISABLEALR){
							if(value == '1'){
								that.SendDataToServer(that.sendSignal.DISALR + "*",socket);
							}else{
								that.SendDataToServer(that.sendSignal.UNDISALR + "*",socket);
							}
						}
					}	
				}
			});
		}
		init_players_listener(0);
		init_players_listener(1);
		init_players_listener(2);
		init_players_listener(3);
		/*----------------------*/
	}

	/*Since PlayerManager is connecting to server adapter, so I design some method
	to communicate*/
	GetDataFromServer(data,socket){
		if(data.includes('ASSI')){
			var elements =  data.split("^");
			var player_id = elements[1];
			var player_name = elements[2];
			var result = this.GetAvailableSeat(player_id,player_name);
			if(result == false){
				this.SendDataToServer("Access Denied !!!",socket);
			}else{
				let socket_config = {
					id:player_id,
					socket:socket
				}
				this.sockets[player_id] = socket_config;
				this.players[player_id].ID = player_id;
				var that = this;
				socket.on('close',function(data){
					that.players[player_id].SetDefault();

					//remove socket from array
					for(var i = 0; i < 4;i++){
						if(that.sockets[i] != null){
							if(that.sockets[i].id == player_id){
								that.sockets[i] = null;
							}
						}	
					}
				});
			}
		}else{
			this.SendDataToPlayer(data,socket);
		}	
	}

	SendDataToServer(_data,socket){
		this.eventEmitter.emit('send-data-to-server',_data,socket);
	}


	GetTime(data){
		for(var i = 0 ; i < this.PLAYER_COUNT;i++){
			if(this.players[i].StopCounter == 0){
				this.players[i].CurrentTime = data.secs + "#" + data.percentage + "#" + data.total;
			}	
		}
	}
}