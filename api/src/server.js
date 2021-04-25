const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const port = 3000;


const app = express();


const mongodbURL = "mongodb+srv://adminsopes1p1:adminsopes1p1@cluster0.c9orq.mongodb.net/proyecto?retryWrites=true&w=majority";
mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(db => console.log('DB is conencted to', db.connection.host))
	.catch(err => {console.log("###################ESTE SERIA EL ERROR#######################"); console.error(err);});

app.use(routes);
app.listen(port,()=>{
	console.log(`App escuchando en http://localhost:${port}`);
})