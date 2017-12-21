"use strict";




function getTchatView(req, res) {
    res.render('tchat/tchat.ejs');
}




exports.getTchatView = getTchatView;
