const express = require('express'); 
const router  = express.Router(); 
const restaurant_records = require('./getAllRestaurants');

router.get('/', restaurant_records.getDetails);
  

module.exports = router;