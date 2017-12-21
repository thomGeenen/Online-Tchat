"use strict";

// Load Required Modules
const path       = require('path'),
      connection = require('./features/connection/connection'),
      tchat      = require('./features/tchat/tchat'),
      forget     = require('./features/forget/forget'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
      signIn     = require('./features/sign_in/sign_in'),
      uuid       = require('node-uuid'),
      cookie     = require('cookie-parser');
let   express    = require('express'),
      app        = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server);


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
        secret: "online_tchat"
    }));

    ////
    //DISPLAY PATH
    ////

    //MAIN PATH
    app.get('/', startSocket);
    //Connection checking
    app.post('/connectUser', connection.connectUser);
    //Redirect to chat
    app.get('/tchat', tchat.getTchatView);
    //Sign in
    app.post('/addUser', signIn.addUser);
    //Get the forget view
    app.get('/forget', forget.getForgetView);
    //Send the mail to the user
    app.post('/recover', forget.getRecoverMail);
    //Get the recover view
    app.get('/forget/recover/', forget.getRecoverView);
    //Change the password according to the mail
    app.post('/forget/recoverMail/', forget.changePassword);
    //Get the post message
    app.get('/sendMessage', startSocket);

    function startSocket(req, res) {

        res.render('tchat/tchat.ejs');

        io.sockets.on('connection', (socket) => {

            console.log("connect");
            
            socket.on('clientValue', (message) => {
                broadcastEmit(message.elt);
            });

            
            function broadcastEmit(value) {
                socket.broadcast.emit('otherData', { other: value });
            }
            
        });

        
    }
    
    //Start the server
    server.listen(8080);
   
}

exports.start = start;

