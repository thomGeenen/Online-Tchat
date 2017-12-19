"use strict";

const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      db = require('../../conf/database'),
      User = mongoose.model('User'),
      nodeMailer = require('nodemailer'),
      parse = require('url-parse');

function getForgetView(req,res) {
    res.render('forget/forget.ejs');
}

function getRecover(req,res) {
    res.render('forget/recover.ejs', {mail : req.body.mail});
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "geenen.kush@gmail.com",
            pass: "$Snoopy-25122013#"
        }
    });

    const options = {
        from : "geenen.kush@gmail.com",
        to   : req.body.mail,
        subject : "Recover Password",
        text : "Vous avez demandé de redéfinir votre mot de passe voici le lien http://localhost:8080/forget/recover/?mail=" + req.body.mail
    };

    transporter.sendMail(options, (err, info) => {
        if(err) return console.error(err);
        else console.log(info.response);
    })
}


function changePasswordByMail(req,res) {
    res.render('forget/recover.ejs', { mail : "" });
    var url = require('url');
    var url_parts = url.parse(req.url, true);
   ;

    const condition = { mail: url_parts.query['mail'] },
          update    = { pass: req.body.pass},
          options   = { multi: false};

    User.update(condition, update, options, (err, num) => {
        if(err) return console.error(err);
        else console.log("reussi : " + num);
    })
}

function changePasswordByName(req,res) {

}

exports.getForgetView = getForgetView;
exports.changePasswordByMail = changePasswordByMail;
exports.changePasswordByName = changePasswordByName;
exports.getRecover = getRecover;
