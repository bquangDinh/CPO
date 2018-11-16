"use strict";
module.exports = class Player
{
	constructor(){
        this.currentScore = 0;
        this.playerName = "Unknown Player";
        this.status = "Offline";
        this.identify = 1;
        this.answerContent = "Unknown";
        this.timeResult = "00:00";
        this.currentTime = -1;
        this.stopTimecounter = 0;
        this.isLocked = 0;
        this.disableAlarm = 0;

        const app = require('electron').remote.app;
        this.defaultAvaPath = app.getAppPath() + "\\View\\Asset\\Image\\user-image-test.jpg";      
        this.avatarSrc = this.defaultAvaPath;

        this.PROPERTIES_NAME = {
            SCORE:'SCO',
            NAME:'NAM',
            STATUS:'STA',
            ID:'_ID',
            ANSWER:'ANS',
            AVATARSRC:'AVS',
            TIME:'TIE',
            STOPCTER:'SCE',
            ALARM:'ARL',
            LOCK:'LOK',
            CURRTIME:"CTE",
            DISABLEALR:"DAL",
            LOCKALARM:"LAR"
        }

        /*Init Events*/
        var event = require('events');
        this.eventEmitter = new event.EventEmitter();
    }

    /*getter and setter*/
    get ID(){
        return this.identify;
    }

    set ID(value){
        this.identify = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.ID + value);
    }

    get Score(){
        return this.currentScore;
    }

    set Score(value){
        this.currentScore = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.SCORE + value);
        this.eventEmitter.emit("send-abroad",this.PROPERTIES_NAME.SCORE + value);
    }

    get Name(){
        return this.playerName;
    }

    set Name(value){
        this.playerName = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.NAME + value);
    }

    get Status(){
        return this.status;
    }

    set Status(value){
        this.status = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.STATUS + value);
    }

    get Answer(){
        return this.answerContent;
    }

    set Answer(value){
        this.answerContent = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.ANSWER + value);
    }

    set AvaSrc(value){
        this.avatarSrc = value;
        this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.AVATARSRC + value);
    }

    get CurentTime(){
        return this.currentTime;
    }

    set CurrentTime(value){
        var time = Number(value.split("#")[0].split(':')[0])*1000 + Number(value.split("#")[0].split(':')[1]);
        var timetotal = Number(value.split("#")[2]);
        this.currentTime = ((timetotal - time)/1000).toFixed(2);

        this.eventEmitter.emit("ui-update",this.PROPERTIES_NAME.CURRTIME + value);     
        this.eventEmitter.emit("send-abroad",this.PROPERTIES_NAME.CURRTIME + value);
    }

    get Time(){
        return this.timeResult;
    }

    set Time(value){
        this.timeResult = value;

        this.eventEmitter.emit("ui-update",this.PROPERTIES_NAME.TIME + value);     
        this.eventEmitter.emit("send-abroad",this.PROPERTIES_NAME.TIME + value);
    }

    get StopCounter(){
        return this.stopTimecounter;
    }

    set StopCounter(value){
        if(value == 0 || value == 1){
            this.stopTimecounter = value;
            this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.STOPCTER + value);
        }
    }

    get Lock(){
        return this.isLocked;
    }

    set Lock(value){
        if(value == 0 || value == 1){
            this.isLocked = value;
            this.eventEmitter.emit("send-abroad",this.PROPERTIES_NAME.LOCK + value);
            this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.LOCK + value);
        }
    }

    get DisableAlarm(){
        return this.disableAlarm;
    }

    set DisableAlarm(value){
        if(value == 0 || value == 1){
            this.disableAlarm = value;
            this.eventEmitter.emit("send-abroad",this.PROPERTIES_NAME.DISABLEALR + value);
            this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.DISABLEALR + value);
        }
    }
    /*-----------------*/

    /*METHODS*/
    SetDefault(){
        this.Status = "Offline";
        this.Name = "Unknown";
        this.Score = 0;
        this.avatarSrc = this.defaultAvaPath;
        this.Answer = "";
    }

    CopyData(target){
        this.Score = target.currentScore;
        this.Name = target.playerName;
        this.ID = target.identify;
        this.Status = target.status;
        this.Answer = target.answerContent;
        this.AvaSrc = target.avatarSrc;
        this.StopCounter = target.stopTimecounter;
        this.Time = target.timeResult;
    }

    Alarm(){
         this.eventEmitter.emit('ui-update',this.PROPERTIES_NAME.ALARM);
    }
    /*-----------------*/
}
