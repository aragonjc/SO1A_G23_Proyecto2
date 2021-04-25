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

module.exports = router;