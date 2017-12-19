"use strict";

const mongoose = require('mongoose'),
      dbURI    = "mongodb://localhost/online_tchat",
      options  = { useMongoClient : true };

mongoose.connect(dbURI, options);

mongoose.connection.on('connected', () => {
    console.log("Vous êtes connectés à la db");
});

mongoose.connection.on('disconnected', () => {
    console.log("Vous êtes déconnectés de la db");
})

mongoose.connection.on('error', (err) => {
    console.log("Error during connection : " + err);
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection disconnected through app termination");``
        process.exit(0);
    });

})

require('../models/users');
