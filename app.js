const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

//Requiring url routes from route.js
const route = require('./routes/route.js')

//MongoDb URL
const MONGO_URL = 'mongodb://localhost:27017/distancecalculator';

//Calling method for DB connection
main()
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    })

//Method containing DB connection
async function main() {
    await mongoose.connect(MONGO_URL);
}

//For cross origin requesting for accepting data from FrontEnd
app.use(cors());
app.use(express.json())

//To access the data in JSON form & data from URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//Middleware for Basic Logging 
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

//Main Routes
app.use('/', route);

//Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    next(err);
});

//Brining Server to live state
app.listen(8080, () => {
    console.log('Server is listening at port 8080');
})