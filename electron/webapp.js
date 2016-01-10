var apps = require('../apps');

try {
  var electron = require('electron');
} catch(e) {
  exports.mainWindow = {
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

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  exports.mainWindow = new BrowserWindow({
    fullscreen: !process.env.npm_config_w
  });

  if (process.env.npm_config_dev) {
    exports.mainWindow.openDevTools();
  }

  showApp(apps.getCurrent());

  exports.mainWindow.on('closed', function() {
    exports.mainWindow = null;
  });
});

exports.showApp = showApp;

function showApp(app) {
  apps.setCurrent(app);
  exports.mainWindow.loadURL(
    apps.get(app).url ||
    'file://' + apps.dir + '/' +  app  + '/index.html'
  );
}
