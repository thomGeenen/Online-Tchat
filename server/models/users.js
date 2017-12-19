"use strict";

const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    name : String,
    mail : String,
    pass : String
});

let User = module.exports = mongoose.model('User', UserSchema);
