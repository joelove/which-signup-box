# Which Signup Box
## A tiny Node.js and Espruino project

A simple, fully JavaScript, codebase to allow an Espruino to beep when a user hits a webpage.

The project consists of three components:

1. The browser code
2. The server code
3. The Espruino code

#### The browser code (browser.js)
A few lines of code to send a blank POST request to the server. Intended to be injected via GTM.

#### The server code (server.js)
A tiny database API written in Node.js: one page to add a timestamp to a database table when it recieves a blank POST; one to GET a JSON object containing the latest 5 entries.

#### The Espruino code (espruino.js)
A simple program to run [on the board](http://www.espruino.com/) that authenticates with a WiFi network then repeatedly queries the API for new entries.
