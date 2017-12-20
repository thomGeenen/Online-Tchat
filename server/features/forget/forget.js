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

//Send the recovering mail
function getRecoverMail(req, res) {

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
        to: req.body.mail,
        subject: "Recover Password",
        text: "Vous avez demandé de redéfinir votre mot de passe voici le lien http://localhost:8080/forget/recover/"
    };

    req.session.email = req.body.mail

    //Send the mail with options
    transporter.sendMail(options, (err, info) => {
        if (err) return console.error(err);
    });

    res.render('connection/connection.ejs', { connectionError: "" });
}

function getRecoverView(req,res) {
    res.render('forget/recover.ejs', { mail : req.session.mail });
}

//Hash & change the password in the db
function changePassword(req,res) {
    bcrypt.hash(req.body.new, 10, (err, hash) => {
        if (err) return console.error(err);
        else {
            const email = req.session.email,
                  condition = { mail: email },
                  update = { pass: hash },
                  options = { multi: false };

            User.update(condition, update, options, (err, num) => {
                if (err) return console.error(err);
            });
        }
    });
    res.render('forget/recover.ejs', { mail: "" });
}

exports.getForgetView = getForgetView;
exports.getRecoverView = getRecoverView;
exports.changePassword = changePassword;
exports.getRecoverMail = getRecoverMail;
