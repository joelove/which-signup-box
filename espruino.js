/* jshint node: true */
'use strict';

var http = require('http'),
    apiUrl = 'http://which-signup-box.herokuapp.com/latest',
    currentTime = 0;

function doAlert() {
  console.log(currentTime);
}

function compareData(data) {
  var dataLength = data.length,
      hasTime = !!currentTime,
      currentItemTime;

  while (dataLength) {
    currentItemTime = data[--dataLength].time;
    if (currentItemTime > currentTime) {
      currentTime = currentItemTime;
      hasTime && doAlert();
    }
  }
}

function getLatest() {
  http.get(apiUrl, function(res) {
    res.on('data', function(data) {
      compareData(JSON.parse(data));
    });
  });
}

setInterval(getLatest, 2500);
