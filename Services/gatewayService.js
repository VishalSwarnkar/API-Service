const fetch = require('node-fetch');

var gateway = {
    
    getOrderAmountByCity: function(city){
        var url = "http://localhost:3000/orders/"
          fetch(url, { method: 'GET'})
            .then((res) => {
               return res.json()
          })
          .then((json) => {
            const data = json.order.reduce((acum, data)=>{if(data.city == city) return acum + data.amount}, 0)
            console.log(data);
          });
    }
}

module.exports = gateway;

gateway.getOrderAmountByCity('Mumbai')