const express = require("express");
const app = express();
const mongoose = require('mongoose');
const History = require('./models/history')
const cors = require('cors');
const bodyParser = require('body-parser')

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

app.use(cors({
    origin: 'fsefsfefs',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.get('/history', async (req, res) => {

    let data = await History.find({})
    console.log(`Data from DB: ${data ? 'data retrieved from DB successful' : 'Error in retriev data from db'}`)
    res.send(data);

})

app.post('/history/new', async (req, res) => {

    let newHistory = new History(req.body);
    console.log(`Data Received from client-side: ${newHistory}`);
    await newHistory.save();
    res.json({
        message: 'Form Data received'
    })

})


app.listen(8080, () => {
    console.log('Server is listening at port 8080');
})