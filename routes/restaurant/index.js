const express = require('express'); 
const router  = express.Router(); 
const restaurant_records = require('../../Services/getAllRestaurants');

router.get('/restaurants', restaurant_records.getDetails);
router.get('/restaurant', restaurant_records.getDetail);
  

module.exports = router;