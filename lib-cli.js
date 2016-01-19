(function(window, $, io) {
  'use strict';

  var smarttv = {};
  window.smarttv = smarttv;

  // Socket
  var socket = io.connect('/');
  smarttv.send = function(msg) {
    socket.emit('message', msg);
    return smarttv;
  };
  smarttv.on = function(c, fn) {
    socket.on(c, fn);
    return smarttv;
  };

  // Apps
  smarttv.getApps = function(fn) {
    socket.emit('apps');
    socket.on('apps', fn);
  };
  smarttv.showApp = function(app) {
    window.location.href = '/' + app;
  };
  smarttv.pressKey = function(key) {
    sendEvent('keyDown', key);
    sendEvent('keyUp', key);
    return smarttv;
  };

  // Hidden keyboard
  $(document).on('pageinit', function() {
    $('body').append(
      $('<input type=text id="st-hidden-input">')
        .width(window.innerWidth)
        .css('position', 'absolute')
        .css('top', '-100%')
    );
  });
  smarttv.showKeyboard = function() {
    $('#st-hidden-input').focus();
    return smarttv;
  };
  smarttv.getPath = function(app) {
    return '/' + app.name + '/client';
  };
  smarttv.getPublicPath = function(app) {
    if (!app) {
      return '../public';
    }
    return '/' + app.name + '/public';
  };

  function sendEvent(type, key) {
    $.ajax('/api/inputs', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        type: type,
        keyCode: key
      })
    });
  }

})(window, $, io);
