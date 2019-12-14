const records = require('../../Services/restaurants');

const rest_model = require('../../Models/restuarantSchema');

var restaurants = {
    
    getDetails: function(req, res, next) {
        console.log(req.query.budget)
        rest_model.find({
            $or: [
                {"name": req.query.name},
                {"location.city": req.query.city},
                {"user_rating.aggregate_rating": req.query.rating},
                {"Budget": req.query.budget},
                {"cuisines": req.query.cuisines}
                // {"menu[0].name": req.query.menu}
            ]
        })
        .select('_id id name location.city user_rating.aggregate_rating Budget cuisines menu')
        .then((restaurant)=>{
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                counts: restaurant.length,
                restaurant: restaurant
            })
          }, (err)=>next(err))
          .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
    }
    
}

module.exports = restaurants;