/* jshint node: true */
'use strict';

var http = require('http'),
    apiUrl = 'http://which-signup-box.herokuapp.com/latest',
    // wlan = require('CC3000').connect(),
    // AccessPointName = 'PlusnetWireless36E321',
    // AccessPointKey = '********',
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

// wlan.connect(AccessPointName, AccessPointKey, function(status){
//   if (status === 'dhcp') {
    setInterval(getLatest, 2500);
//   }
// });
