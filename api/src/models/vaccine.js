const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    location:String,
    gender:String,
    age:Number,
    vaccine_type:String
})

module.exports = mongoose.model('vacunados',Schema);