/* jshint node: true */
'use strict';

var http = require('http'),
    apiUrl = 'http://which-signup-box.herokuapp.com/latest',
    wlan = require('CC3000').connect(),
    AccessPointName = 'AccessPointName',
    AccessPointKey = 'AccessPointKey',
    currentTime = 0;

function doBeep() {
  console.log(currentTime); // Placeholder
}

function compareTimestamp(data) {
  var dataLength = data.length,
      hasTime = !!currentTime,
      currentItemTime;

  while (dataLength) {
    currentItemTime = data[--dataLength].time;
    if (currentItemTime > currentTime) {
      currentTime = currentItemTime;
      hasTime && doBeep();
    }
  }
}

function getLatest() {
  http.get(apiUrl, function(res) {
    res.on('data', function(data) {
      compareTimestamp(JSON.parse(data));
    });
  });
}

wlan.connect(AccessPointName, AccessPointKey, function(status) {
  if (status === 'dhcp') {
    setInterval(getLatest, 2500);
  }
});
