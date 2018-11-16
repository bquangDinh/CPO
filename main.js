const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const {path} = require('path');

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1052, height: 650, frame: false,resizable:false});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/View/HTML/configuration-page.html');

  //send server configuration to main page

  /*Set up events*/
  
  /*Set Server Configuration*/
  ipcMain.once('set-up-server-configuration',(event,arg) => {
  const win = BrowserWindow.fromId(2);

  win.webContents.on('did-finish-load',function(){
    win.webContents.send('set-up-server',arg);
  });
  
  /*Update players information*/
  ipcMain.on('players-information',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.on('did-finish-load',function(){
      win.webContents.send('players-information',arg);
    });
    win.webContents.send('players-information',arg);
  });

  /*Update Header Board*/
  ipcMain.on('header-update',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('header-update',arg);
  });

  /*Update Ranking To Player Board*/
  ipcMain.on('alarm-ranking',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('alarm-ranking',arg);
  });
  /*------------*/

  ipcMain.on('alarm-clearing',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('alarm-clearing',arg);
  });

  ipcMain.on('change-show-mode',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('change-show-mode',arg);
  });

  ipcMain.on('time-set-up',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('time-set-up',arg);
  });

  ipcMain.on('time-stop',(event,arg) => {
    var id = arg.WD_ID;
    const win = BrowserWindow.fromId(id);
    win.webContents.send('time-stop',arg);
  });
  /*-----------------*/
  
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

/*
const os = require('os');
const NUMBER_OF_CORES = os.cpus().length;
let startTime = process.hrtime();
let startUsage = process.cpuUsage();

setInterval(() => {
  var now = Date.now();
  while(Date.now() - now < 500);

  const newTime = process.hrtime();
  const newUsage = process.cpuUsage();
  const elapTime = process.hrtime(startTime);
  const elapUsage = process.cpuUsage(startUsage);
  startUsage = newUsage;
  startTime = newTime;

  const elapTimeMS = hrtimeToMS(elapTime);

  const elapUserMS = elapUsage.user / 1000;
  const elapSystMS = elapUsage.system / 1000;
  const cpuPercent = (100 * (elapUserMS + elapSystMS) / elapTimeMS / NUMBER_OF_CORES).toFixed(1) + "%";

  console.log('elapsed time ms : ',elapTimeMS);
  console.log('elapsed user ms : ',elapUserMS);
  console.log('elapsed system ms : ',elapSystMS);
  console.log('cpu percent : ',cpuPercent,'\n');
},1000);

function hrtimeToMS(hrtime){
  return hrtime[0] * 1000 + hrtime[1] / 1000000;
}
*/

