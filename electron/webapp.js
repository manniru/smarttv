var apps = require('../apps');

try {
  var electron = require('electron');
} catch(e) {
  mainWindow = {
    loadURL: function() {},
    webContents: {
      send: function() {}
    },
    showApp: function(app) {
      apps.setCurrent(app);
    }
  };
  return;
}

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    fullscreen: !process.env.npm_config_w
  });

  if (process.env.npm_config_dev) {
    mainWindow.openDevTools();
  }

  showApp(apps.getCurrent());

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

exports.showApp = showApp;
exports.input = input;
exports.send = send;

function input() {
  console.log('FIRED1');
  mainWindow.webContents.sendInputEvent.apply(mainWindow.webContents, arguments);
}

function send() {
  mainWindow.webContents.send.apply(mainWindow.webContents, arguments);
}

function showApp(app, cb) {
  apps.setCurrent(app);
  mainWindow.loadURL(
    apps.get(app).url ||
    'file://' + apps.dir + '/' +  app  + '/index.html'
  );
  if (typeof cb === 'function') {
    mainWindow.webContents.on('did-stop-loading', function() {
      cb();
    });
  }
}
