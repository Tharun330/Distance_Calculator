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
        set: (val) => parseFloat(val.toFixed(2))   

    },
    distanceInKilometers: {
        type: Number,
        set: (val) => parseFloat(val.toFixed(2)) 

    },

})

const History = mongoose.model('History', historySchema);
module.exports = History;

