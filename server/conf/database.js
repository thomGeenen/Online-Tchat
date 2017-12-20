"use strict";

//Load required middlewares
const mongoose = require('mongoose'),
      dbURI    = "mongodb://localhost/online_tchat",
      options  = { useMongoClient : true };

//Connection with options
mongoose.connect(dbURI, options);

//Catch the "connection" event
mongoose.connection.on('connected', () => {
    console.log("CONNECTION TO THE DB...");
    console.log("HOST CONNECTED TO THE DB")
});

//Catch the "disconnection" event
mongoose.connection.on('disconnected', () => {
    console.log("YOU'RE NOW CONNECTED");
});

//Catch the "error" event
mongoose.connection.on('error', (err) => {
    console.log("CONNECTION TO THE DB ERROR : " + err);
});

//Catch the keyboard interupt
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("SHUTDOWN SERVER...");``
        process.exit(0);
    });

});

//Call my Mongodb Models
require('../models/users');
