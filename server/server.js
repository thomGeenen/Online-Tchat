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
      cookie     = require('cookie-parser'),
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
    //Parse the Json 
    app.use(bodyParser.json());
    // Set the cookie to use
    app.use(session({
        genid: function(req) {
           return uuid.v1();
        },
        resave: false,
        saveUninitialized: true,
        secret: "sndflsdkfzoenf@nfz"
    }));

    ////
    //DISPLAY PATH
    ////

    //MAIN PATH
    app.get('/', connection.getConnectionView);
    //Tchat path
    app.get('/tchat', tchat.getTchatView);
    //Connection checking
    app.post('/connectUser', connection.connectUser);
    //Sign in
    app.post('/addUser', signIn.addUser);
    //Get the forget view
    app.get('/forget', forget.getForgetView);
    //Send the mail to the user
    app.get('/recover', forget.getRecoverMail);
    //Get the recover view
    app.get('/forget/recover/', forget.getRecoverView);
    //Change the password according to the mail
    app.post('/forget/recoverMail/', forget.changePassword);

    
    //Start the server
    http.createServer(app).listen(8080);
}

exports.start = start;