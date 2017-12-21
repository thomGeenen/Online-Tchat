"use strict";




function getTchatView(req, res) {
    res.render('tchat/tchat.ejs');
}

function sendMessage(req, res) {
   res.render('tchat/tchat.ejs');
}




exports.getTchatView = getTchatView;
exports.sendMessage = sendMessage;


//TODO: Push send-> retrieve input val -> send to server ->  general emit -> recover -> put in dom