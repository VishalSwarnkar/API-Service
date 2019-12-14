const Dishes = require('../Models/restuarantSchema');

const product_services = {

    getAllResturantRecords: function(){
        return {restaurants: [{name: "Taj Restaurant", description: "5 star resturants", location: "Mumbai"},
        {name: "Oberoi", description: "5 star resturants", location: "Kolkata"}]}
    },

    getOneRestaurantDetails: function() {
        return {name: "Taj Restaurant", description: "5 star resturants", location: "Mumbai"};
    }
}

module.exports = product_services;