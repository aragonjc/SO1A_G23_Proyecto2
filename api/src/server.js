require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const port = 3002;


const app = express();

app.use(cors());
app.use(express.json());


const mongodbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(db => console.log('DB is conencted to', db.connection.host))
	.catch(err => {console.log("###################ESTE SERIA EL ERROR#######################"); console.error(err);});

app.use(routes);
app.listen(port,()=>{
	console.log(`App escuchando en http://localhost:${port}`);
})