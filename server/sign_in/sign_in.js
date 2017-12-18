"use strict";
const bcrypt   = require('bcrypt'),
      mongoose = require('mongoose');


//Function that add user in the db 
function addUser(req, res) {

    //Verify that the password is the same as retype
    if (req.body.pass === req.body.retype) {

        mongoose.connect('mongodb://localhost/online_tchat', { useMongoClient: true });

        const db = mongoose.connection;

        //Schematize the user
        let userSchema = mongoose.Schema({
            name: { type: String, required: true },
            mail: { type: String, required: true },
            pass: { type: String, required: true },
        });

        //Integrate User's model
        let Users = mongoose.model('Users', userSchema);

        //Catch connection error
        db.on('error', console.error.bind(console, 'connection error : '));

        //Use cursor to prepare Schema
        db.once('open', () => {

            //Bcrypt Hash Pass runBy10  
            bcrypt.hash(req.body.pass, 10, (err, hash) => {

                //Initialize the Users variables with the fields value
                let newUsr = new Users({
                    name: req.body.name,
                    mail: req.body.mail,
                    pass: hash
                });

                //Save the user to the db
                newUsr.save((err, cat) => {
                    if (err) return console.error("Error during the savings " + err);
                   
                });
            });
        });
        //Redirect to the connection View with connectionError = none
        res.render('connection/connection.ejs', {connectionError: ""});
    }
}

exports.addUser = addUser;