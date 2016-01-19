# SmartTv

Your own smart tv running on [Electron](http://electron.atom.io/).

## Usage

Start cloning SmartTv.

    git clone https://github.com/mariolamacchia/smarttv.git

Then you'll need some apps to start, so far these only these apps exist:

- [A default launcher app](https://github.com/mariolamacchia/smarttv-menu),
  required to start the SmartTv
- [YouTube](https://github.com/mariolamacchia/smarttv-youtube)
- [Tic Tac Toe](https://github.com/mariolamacchia/smarttv-tictactoe)

**NB** SmartTv is a young but cool project. If you want to experience all of it,
I strongly suggest to install all the apps.

SmartTv will get all the available apps from the directory ~/.smarttv/apps:

    mkdir -p ~/.smarttv/apps
    cd ~/.smarttv/apps
    git clone https://github.com/mariolamacchia/smarttv-menu
    # clone all the other apps you're interested in

To start, go back to the SmartTv folder and run

    npm start

You can use your mobile or your browser as remote devices, just going to the
address where the process is running on, e.g.:

    192.168.1.53:8000

Default port is 8000, but it can be overridden with `--port` parameter:

    npm start --port=1234

## Creating new apps for SmartTv

**(Yeoman generator is coming!)** To create a SmartTv app, just clone an [empty
app](https://github.com/mariolamacchia/smarttv-empty). The default app structure
is:

- client/
  - index.html
  - ...
- public/
- index.html
- smarttv.json

index.html in the root folder is the web application that will be run on the
SmartTv, while index.html in client folder will be run on your device.

The two applications are strictly related: when trying to open the client app
(http://APP_IP:PORT/APPNAME), Electron will load the server one. If you want to
provide files to the outside (accessible without loading the app), you can use
the public/ folder (http://APP_IP:PORT/APPNAME/public/).

**smarttv.json** it's the file that will be read by the SmartTv. It should have
a structure like this:

    {
        "title": "Label of the app",
        "icon": "icon.png",
        "url": "https://example.com/",
        "launcher": true|false
    }

- **title**: app's label, usually it will be shown on the main menu
- **icon**: app's icon, taken from public/ folder
- **launcher**: indicates that the current app is the one which the SmartTv has
  to boot with. You can have only a launcher app installed!
- **url**: if present, SmartTv will open the specified url when loading the app
  instead of the main *index.html*

By default, both remote device and electron apps use libraries that provide all
SmartTv functionalities. Here is the doc related to those libraries:

### Remote device API:

You can get the lib from http://APP_IP:PORT/smarttv.js. It will set a global
variable `smarttv`.

- **smarttv.send(obj)**: send an asynchronous message containing *obj* to the
  electron app.
- **smarttv.on(channel, cb)**: intercept and handle messages from the
  electron app. *channel* might be:

  - *public* will intercept messages to all devices
  - *private* will intercept messages sent to the current devices
  - *message* will intercept both the previous messages

  The *cb* function will be called with the object of the message as first
  parameter.
- **smarttv.getApps(cb)**: get the list of installed apps from the server and
  run the *cb* function with the list as first parameter.
- **smarttv.showApp(appName)**: redirect the browser to the requested apps,
  causing Electron to load the new app on the tv.
- **smarttv.pressKey(keyCode)**: make Electron emulate a keyPress on the tv app
  (both keydown and keyup will be fired). *keyCode* can be either a single
  character or one between: *enter, backspace, delete, tab, escape, control,
  alt, shift, end, home, insert, left, up, right, down, pageUp, pageDown,
  printScreen*
- **smarttv.showKeyboard()**: Force mobile browser to show the keyboard. This is
  done by focusing an hidden input placed into the DOM.
- **smarttv.getPath(app)**: return the path of the requested app
  (http://APP_IP:PORT/APPNAME/client)
- **smarttv.getPublicPath(app)**: return the public path of the requested app   
  (http://APP_IP:PORT/APPNAME/public)

### Electron apps API:

You can get the library by writing this code as first script:

    window.smarttv = require(process.cwd() + '/lib-ser');

- **smarttv.apps**: list of apps installed.
- **smarttv.on(cb)**: intercept messages from the remote device app. *cb* is a
  callback function that will have the message object as a first argument.
- **smarttv.send([client,] obj)**: send a message containing *obj*. The message
  will be sent to *client* if specified, otherwise to all the connected devices.

## Contributing

SmartTv idea was born just after last Christmas (when I had my tv as a gift...)
and has been implemented in less than a month. A lot of things still have to be
done! Anyone can help me either in development or in creating new apps.

Here a small todo list I wrote down:

- Implement a storage on Electron side
- Apps should be SPA (browser refreshing makes me feel so bad)
- Create mobile application
- Serve apps in a decent way (right now I'm using express static)
- Install apps with npm
