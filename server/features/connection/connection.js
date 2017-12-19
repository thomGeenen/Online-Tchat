"use strict";

//Load required middlewares

const bcrypt = require('bcrypt'),
      mongoose = require('mongoose'),
      db       = require('../../conf/database'),
      User     = mongoose.model('User');

//Function to call the Connection or Sign in View
function getConnectionView(req,res) {
    res.render('connection/connection.ejs', { connectionError : "" });
}
//Function that verify if the user already exists
//And if the mail & the pass matches
function connectUser(req,res) {
    
    //Search for the right user
    User.findOne({mail : req.body.mail}, (err, user) => {
        //Check if the user is set from the mail
        if (user) {
            //Catch the finder error
            if (err) {
                res.render('connection/connection.ejs');
                return console.error(err);
            }
            //Mail is right
            else {
                //Compare the entered pass & the db pass
                bcrypt.compare(req.body.pass, user.pass, (err, result) => {
                    //If true : password matches => connection accepted
                    if (result) {
                        res.render('tchat/tchat.ejs');
                    }
                    //Else false : password doesn't matches
                    else {
                        res.render('connection/connection.ejs', {connectionError : "wrong pass"});
                    }
                });
            }  
        }
        //Wrong mail
        else {
            res.render('connection/connection.ejs', { connectionError : "wrong mail"});
        } 
    });
}

//Export the functions
exports.getConnectionView = getConnectionView;
exports.connectUser = connectUser;
