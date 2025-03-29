const getGeocode = require('../geoCode');
const haversine = require('haversine');
const History = require('../models/history')


module.exports.getHistory = async (req, res) => {

    try {

        let data = await History.find({})
        console.log(`Data from DB: ${data ? 'data retrieved from DB successful' : 'Error in retriev data from db'}`)
        res.send(data);

    } catch (err) {

        console.log(err.message);
        res.json({
            error: err.message
        })
    }


}

module.exports.postQuery = async (req, res) => {


    try {
        console.log(req.body ? `Data Received from client-side` : `Error while retrieveing data from client-side`);
        const { sourceAddress, destinationAddress } = req.body;
        console.log(sourceAddress, destinationAddress);

        if (!sourceAddress || sourceAddress.length < 5 || !destinationAddress || destinationAddress.length < 5) {
            console.log('Both addresses are required');
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
            sourceAddress: req.body.sourceAddress,
            destinationAddress: req.body.destinationAddress,
            distanceInMiles: distanceMiles,
            distanceInKilometers: distanceKilometers
        });
        await newHistory.save();


        res.json({
            distanceInMiles: parseFloat(distanceMiles.toFixed(2)),
            distanceInKilometers: parseFloat(distanceKilometers.toFixed(2))
        })

    } catch (err) {

        res.json({
            error: err.message
        })
    }

}

module.exports.unknownRoute = (req, res, next) => {
    console.log("Route not found! Enter Valid url");
    res.status(404).json({ error: "Route not found" });
}