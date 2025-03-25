const express = require("express");
const app = express();
const mongoose = require('mongoose');
const History = require('./models/history')
const cors = require('cors');
const bodyParser = require('body-parser')
const axios = require('axios');
const getGeocode = require('./geoCode');
const haversine = require('haversine');

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
    

    try {
        console.log(req.body?`Data Received from client-side`: `Error while retrieveing data from client-side`);
        const { sourceAddress, destinationAddress } = req.body;
        console.log(sourceAddress,destinationAddress);

        if (!sourceAddress || !destinationAddress) {
            return res.status(400).json({ error: "Both addresses are required" });
        }

        // Get coordinates for both addresses
        const location1 = await getGeocode(sourceAddress);
        const location2 = await getGeocode(destinationAddress);

        // Calculate distance using Haversine formula
        const distanceKilometers = haversine(location1, location2, { unit: 'km' });
        const distanceMiles = haversine(location1, location2, { unit: 'mile' });

        console.log(`DisMiles: ${distanceMiles}`);
        console.log(`DisKilo: ${distanceKilometers}`);

        let newHistory = new History({
            sourceAddress : req.body.sourceAddress,
            destinationAddress : req.body.destinationAddress,
            distanceInMiles : distanceMiles,
            distanceInKilometers :distanceKilometers
        });
        
        await newHistory.save();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
   
    res.json({
        message: 'Form Data received'
    })

})






// app.post('/geocodes',async(req,res) =>{
//     try {
//         const { address1, address2 } = req.body;

//         if (!address1 || !address2) {
//             return res.status(400).json({ error: "Both addresses are required" });
//         }

//         // Get coordinates for both addresses
//         const location1 = await getGeocode(address1);
//         const location2 = await getGeocode(address2);

//         // Calculate distance using Haversine formula
//         const distance = haversine(location1, location2, { unit: 'km' });

//         res.json({
//             address1: location1,
//             address2: location2,
//             distance_km: distance.toFixed(2)
//         });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }

// });


app.listen(8080, () => {
    console.log('Server is listening at port 8080');
})