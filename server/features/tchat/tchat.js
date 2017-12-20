"use strict";

const express = require('express'),
      app     = express(),
      server  = require('http').createServer(app),
      io      = require('socket.io')(server);

function getTchatView(req, res) {
    res.render('tchat/tchat.ejs');
}

function sendMessage(req, res) {
   res.render('tchat/tchat.ejs');
}


function startSocket(req,res) {

    io.on('connection', (socket) => {
       
        socket.on('clientElement', (data) => {
            console.log(data);
        })
    });
}

exports.getTchatView = getTchatView;
exports.sendMessage = sendMessage;
exports.startSocket = startSocket;
exports.io = io;
exports.express = express;
exports.app = app;
exports.server = server;

//TODO: Push send-> retrieve input val -> send to server ->  general emit -> recover -> put in dom