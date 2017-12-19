"use strict";

function getForgetView(req,res) {
    res.render('forget/forget.ejs');
}


function changePasswordByMail(req,res) {

}

function changePasswordByName(req,res) {

}

exports.getForgetView = getForgetView;
exports.changePasswordByMail = changePasswordByMail;
exports.changePasswordByName = changePasswordByName;
