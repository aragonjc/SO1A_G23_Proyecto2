const express = require('express');
const Vaccine = require('../models/vaccine');
const mongoose = require('mongoose')

let router = express.Router();

router.route('/api/data')
.get(async(req,res) => {
    console.log("----------------------------------");
    console.log("HOLA");
    console.log("----------------------------------");
    const data = await Vaccine.find({});
    
    //res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
})
.post((req,res)=>{
    let docs = req.body;
    docs._id = mongoose.Types.ObjectId();
    let data = new Vaccine(docs);
    data.save()
    .then(result => res.send(result))
    .catch(err => res.send(err));
})

router.route('/api/genderbycountry')
.get(async(req,res) => {
    const countries = await Vaccine.aggregate([
        {$group:{
            _id:"$location",
            count:{$sum:1}
        }}
    ]);
    const listCountries = countries.map(element => {
        return element._id
    });
    console.log(listCountries);
    const data = await Vaccine.aggregate([
        {$group:{
            _id:{location:"$location",gender:"$gender"},
            count:{$sum:1}
        }},
    ]);
    const results = {countries:listCountries,data:data}
    res.json(results);
});

router.route('/api/countries')
.get(async(req,res)=>{
    const countries = await Vaccine.aggregate([
        {$group:{
            _id:"$location",
            count:{$sum:1}
        }}
    ]);
    const listCountries = countries.map(element => {
        return element._id
    });
    res.json({countries:listCountries})
})

router.route('/api/lastbycountry')
.post(async(req,res) => {
    const country = req.body.country;
    console.log(country)
    const lastVaccined = await Vaccine.find({location:country})
    .sort({createdAt:-1})
    .limit(5)
    .then(result =>{ console.log(result); return res.json(result);})
    .catch(err => res.json(err));
});

module.exports = router;