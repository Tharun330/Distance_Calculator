const axios = require('axios');


const getGeocode = async (address) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1
            }
        });

        if (response.data.length === 0) {
            throw new Error("Address not found");
        }

        const { lat, lon } = response.data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (error) {
        throw new Error(`Geocoding failed for "${address}": ${error.message}`);
    }
};


module.exports =  getGeocode;