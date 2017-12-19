"use strict";

function getTchatView(req, res) {
    res.render('tchat/tchat.ejs');
}

function sendMessage(req, res) {
   
}

exports.getTchatView = getTchatView;
exports.sendMessage = sendMessage;