const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    location:String,
    gender:String,
    age:Number,
    vaccine_type:String
},{
    timestamps: true
})

module.exports = mongoose.model('vacunados',Schema);