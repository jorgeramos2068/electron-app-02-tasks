const db = require('electron-db');
const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');

const location = path.join(__dirname, '');
 
createDB = () => {
  db.createTable('items', location, (succ, msg) => {
  });
};

saveItem = (obj) => {
  db.insertTableContent('items', location, obj, (succ, msg) => {
  });
};

getAllItems = () => {
  db.getAll('items', location, (succ, data) => {
    const win = BrowserWindow.getFocusedWindow();
    win.webContents.send('all-items', data);
  });
};

updateItem = (id, name) => {
  const where = {
    id
  };
  const set = {
    name
  };
  db.updateRow('items', location, where, set, (succ, msg) => {
  });
};

deleteItem = (id) => {
  const where = {
    id
  };
  db.deleteRow('items', location, where, (succ, msg) => {
  });
};

getItem = (id) => {
  const where = {
    id
  };
  db.getRows('items', location, where, (succ, msg) => {
    return data[0];
  });
};

ipcMain.on('save-item', (event, arg) => {
  const name = arg.trim();
  if (name !== '') {
    const item = {
      id: new Date().getTime(),
      name
    }
    saveItem(item);
  }
})

module.exports = {
  createDB,
  saveItem,
  getAllItems,
  updateItem,
  deleteItem,
  getItem
};
