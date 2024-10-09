require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRouter = require('./routes/noteRoutes.js');

const DB_URL = process.env.DB_URL;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
// see .env file

async function run(){
    try{

        mongoose.connect(process.env.DB_URL, { 
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log("Successfully connected to the database mongoDB Atlas Server");
        

        app.get('/', (req, res) => {
            res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
        });
        
        app.use('/api/v1/note', noteRouter);        

        app.listen(8081, () => {
            console.log("Server is listening on port 3000");
        });

    } catch (err) {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }
}


run().catch(console.dir); // print any uncaught errors in structured format

