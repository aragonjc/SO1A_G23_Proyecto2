const express = require('express');
const Vaccine = require('../models/vaccine');

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
})


module.exports = router;