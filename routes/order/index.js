const express = require('express'); 
const router  = express.Router(); 
// const restaurant_records = require('./getAllRestaurants');

const mongoose = require('mongoose');

const Order = require('../../Models/order');

router.get('/', (req, res, next)=>{
    Order.find()
    .select('productId quantity _id amount city')
    .exec()
    .then(result=>{
        res.status(200).json({
            counts: result.length,
            order: result.map(order=>{
                return {
                    _id: order.id,
                    productId: order.productId,
                    quantity: order.quantity,
                    amount: order.amount,
                    city: order.city,
                    request: {
                        type: 'GET',
                        ur: 'http://localhost:3000/orders/' + order._id
                    }
                }
            })
            
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next)=>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity,
        amount: req.body.amount,
        city: req.body.city
    })
    order.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: "Order Stored",
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity,
                amount: result.amount,
                city: result.city
            },
            request: {
                type: 'GET',
                ur: 'http://localhost:3000/orders/' + result._id
            }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
    
})

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .then((orders)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
        res.status(200).json({
            message: 'Order details',
            orderId: req.params.orderId
        });
    }, (err)=>next(err))
    .catch((error)=>next(error));
});

router.delete('/:orderId', (req, res, next) => {
    Order.findByIdAndDelete(req.params.orderId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        res.status(200).json({
            message: 'Order deleted',
            orderId: req.params.orderId
        });
      }, (err)=>next(err))
      .catch((error)=>next(error));
});

router.put('/:orderId', (req, res, next) => {
    Order.findByIdAndUpdate(req.params.orderId, {
        $set: req.body
      }, {new: true} )
      .then((orders)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.json(orders);
        res.status(200).json({
            message: 'Order Updated',
            orderId: req.params.orderId
        });
      }, (err)=>next(err))
      .catch((error)=>next(error));
});

router.get('/restaurant/:restId/:city', (req, res, next)=>{
    Order.find({
        $and: [
            {productId: req.params.restId}, {city: req.params.city}
        ]
    })
    .then(result=>{
        console.log(result);
        res.status(200).json({
            counts: result.length,
            city: req.params.city,
            amount: result.reduce((acum, data)=>{return acum + data.amount}, 0)
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
})
  

module.exports = router;