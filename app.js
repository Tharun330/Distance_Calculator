const express = require("express");
const app = express();
const mongoose = require('mongoose');
const History = require('./models/history')

const MONGO_URL = 'mongodb://localhost:27017/distancecalculator';


main()
    .then(() => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.get('/test', (req, res) => {

    res.send('Hi root');

})


app.listen(8080, () => {
    console.log('Server is listening at port 8080');
})