const express = require('express');
const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost/KadunaRestaurants';
const routes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

//initialize express
const app = express();

//connect to database
mongoose.connect(databaseUrl, {useNewUrlParser: true});


//get connection object
const conn = mongoose.connection;

//check if connection was successful
conn.on('open', () =>  console.log("Connected to database"));



app.use(express.json());
app.use('/api/v4', routes);

///all your error handler middleware must be registered after your routes
app.use(errorHandler);



//open a server and listen on a port
app.listen(9090, () => console.log("Server Started"));


