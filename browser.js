var apiUrl = 'http://which-signup-box.herokuapp.com/add.gif',
    xmlhttp = new (XMLHttpRequest || ActiveXObject)('Microsoft.XMLHTTP');

xmlhttp.open('POST', apiUrl, true);
xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xmlhttp.send('id=' + 123);
