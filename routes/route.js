const express = require('express');
const router = express.Router();

const HistoryController = require('../controllers/history')


//GET route for retrieving data from DB
router.get('/history', HistoryController.getHistory)

//POST route for saving new requesting into the DB & Calculating distance between 2 geocodes using Haversine formula
router.post('/history/new',  HistoryController.postQuery)

//Handling error for unknown path
router.use('/*', HistoryController.unknownRoute);
 
 
module.exports = router