const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({

    sourceAddress: {
        type: String,
        required: true

    },
    destinationAddress: {
        type: String,
        required: true

    },
    distanceInMiles: {
        type: Number,
        required: true

    },
    distanceInKilometers: {
        type: Number,
        required: true

    },

})

const History = mongoose.model('History', historySchema);
module.exports = History;

