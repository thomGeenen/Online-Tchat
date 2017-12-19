"use strict";

//Load required middlewares
const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      db = require('../../conf/database'),
      User = mongoose.model('User'),
      nodeMailer = require('nodemailer');

function getForgetView(req,res) {
    res.render('forget/forget.ejs');
}

function getRecoverView(req,res) {
    res.render('forget/recover.ejs', { mail : req.session.mail });
}

//Send the recovering mail
function getRecoverMail(req,res) {

    //Parse the mail & save him 
    const url = req.url;
    let url_parts = url.split("=");
    let email = url_parts[1];
    email.toString();
    email = email.replace("%40", "@");
    //save the parsed mail in the session storage
    req.session.mail = email;
    req.session.save((err) => {
        if(err) console.error(err);
    });

    // SNMP Transporter
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "geenen.kush@gmail.com",
            pass: "$Snoopy-25122013#"
        }
    });

    const options = {
        from: "geenen.kush@gmail.com",
        to: email,
        subject: "Recover Password",
        text: "Vous avez demandé de redéfinir votre mot de passe voici le lien http://localhost:8080/forget/recover/?mail=" + email //Link is a GET method to access the recovery view / 
        //FIXME: prevent GET access trought XSS SCRIPT
        //TODO: CHANGER LA VARIABLE
    };

    //Send the mail with options
    transporter.sendMail(options, (err, info) => {
        if (err) return console.error(err);
    });

    res.render('connection/connection.ejs', { connectionError: "" });
}


function changePassword(req,res) {
    const email = req.session.mail;
    const condition = { mail: email },
          update    = { pass: req.body.new},
          options   = { multi: false};

    User.update(condition, update, options, (err, num) => {
        if(err) return console.error(err);
    });

    res.render('forget/recover.ejs', { mail: email });
}

exports.getForgetView = getForgetView;
exports.getRecoverView = getRecoverView;
exports.changePassword = changePassword;
exports.getRecoverMail = getRecoverMail;
