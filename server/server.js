"use strict";

// Load Required Modules
const http       = require('http'),
      express    = require('express'),
      path       = require('path'),
      connection = require('./features/connection/connection'),
      tchat      = require('./features/tchat/tchat'),
      forget     = require('./features/forget/forget'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
      signIn     = require('./features/sign_in/sign_in'),
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
    app.get('/forget', forget.getForgetView);
    //Recover password path
    app.get('/recover', forget.getRecover);
    //Change pass when clicking
    app.post('/forget/recover', forget.changePasswordByMail);

    app.get('/forget/recover', forget.changePasswordByMail);

    
    //Start the server
    http.createServer(app).listen(8080);
}

exports.start = start;