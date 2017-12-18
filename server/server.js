"use strict";

// Load Required Modules
const http       = require('http'),
      express    = require('express'),
      path       = require('path'),
      connection = require('./connection/connection'),
      tchat      = require('./tchat/tchat'),
      forget     = require('./forget/forget'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
      signIn     = require('./sign_in/sign_in'),
      uuid       = require('node-uuid'),
      app        = express();

//Function to start the server
function start() {

    //Set the template engine
    app.set('view engine', 'ejs');
    //Set the views directory
    app.set('views', path.join('client'));
    //Set the static folder to use
    app.use(express.static(path.join('public')));
    //Parse the url 
    app.use(bodyParser.urlencoded({ extended: false }));
    //Set the cookie to use
    app.use(session({
        genid: function(req) {
           return uuid.v1();
        },
        resave: true,
        saveUninitialized: true,
        cookie : { secure: false },
        secret: "online_tchat"
    }));

    ////
    //DISPLAY PATH
    ////

    //Connection path
    app.get('/', connection.getConnectionView);
    //Tchat path
    app.get('/tchat', tchat.getTchatView);
    //Connection Treatment
    app.post('/connectUser', connection.connectUser);
    //Sign in Treatement
    app.post('/addUser', signIn.addUser);
    //Forget password Treatment
    app.get('/forgetPassword', forget.getForgetView);
    //Message Treatement
    app.post('/sendMessage', tchat.sendMessage);
    
    //Start the server
    http.createServer(app).listen(8080);
}

exports.start = start;