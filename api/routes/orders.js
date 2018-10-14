const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'GET to /orders'
    });
});

router.get('/:id', (request, response, next) => {
    response.status(200).json({
        id: request.params.id,
        message: 'GET :id request to /orders'
    });
});

router.post('/', (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(201).json({
        message: 'Order created successfully',
        order: order
    });
});

router.delete('/:id', (request, response, next) => {
    response.status(204).json({
        id: request.params.id,
        message: 'DELETE request to /orders'
    });
});

module.exports = router;