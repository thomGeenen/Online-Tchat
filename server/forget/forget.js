"use strict";

function getForgetView(req,res) {
    res.render('forget/forget.ejs');
}


function changePasswordByMail() {

}

function changePasswordByName() {

}

exports.getForgetView = getForgetView;
exports.changePasswordByMail = changePasswordByMail;
exports.changePasswordByName = changePasswordByName;
