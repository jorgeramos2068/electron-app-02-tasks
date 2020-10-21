const {app, BrowserWindow, ipcMain} = require('electron');
const itemsDB = require('./database');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
itemsDB.createDB();

app.on('ready', () => {
  ipcMain.on('send-items', (event, data) => {
    itemsDB.getAllItems();
  });
});
