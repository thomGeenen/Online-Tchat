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

        socket.on('connect', (data) => {
            console.log(data);
        });

        socket.on('clientSend', (data) => {
            console.log("message : " + data.message + " à : " + data.message_timestamp);
        });
    });
    res.render('tchat/tchat.ejs');
}

exports.getTchatView = getTchatView;
exports.sendMessage = sendMessage;
exports.startSocket = startSocket;
exports.io = io;
exports.express = express;
exports.app = app;
exports.server = server;