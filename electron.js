const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow () {
  exports.mainWindow = new BrowserWindow({width: 800, height: 600});
  exports.mainWindow.loadURL(`file://${__dirname}/index.html`);
  exports.mainWindow.webContents.openDevTools();
  exports.mainWindow.on('closed', function () {
    exports.mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (exports.mainWindow === null) {
    createWindow();
  }
});
