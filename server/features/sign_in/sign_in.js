"use strict";

const bcrypt   = require('bcrypt'),
      mongoose = require('mongoose'),
      User     = mongoose.model('User');

//Function that add user in the db 
function addUser(req,res) {

    //Verify that the password is the same as retype
    if (req.body.pass === req.body.retype) {

            //Bcrypt Hash Pass runBy10  
            bcrypt.hash(req.body.pass, 10, (err, hash) => {
                //Initialize the Users variables with the fields value
                User.create({
                    name: req.body.name,
                    mail: req.body.mail,
                    pass: hash
                }, (err, user) => {
                    //Catch the error
                    if(err) return console.error(err);
                });
            });
        //Redirect to the connection View with connectionError = none
        res.render('connection/connection.ejs', {connectionError: "Il n'y a plus qu'à te connecter ;)"});
    }
}

exports.addUser = addUser;