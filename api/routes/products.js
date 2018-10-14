const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

/**CREATE */
router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save().then(data => {
        console.log(data);
        if(doc) {
            response.status(201).json({
                message: 'Product created successfully',
                product: data
            });
        }else {
            response.status(400).json({message: `Bad request`});
        }
    }).catch(err => {
        console.log(err);
        response.status(500).json({error: err});
    });
});

/**UPDATE */
router.put('/:id', (request, response, next) => {
    const id = request.body.id;
    Product.update({ _id: id }, { $set: { name: request.body.name, price: request.body.price } })
        .exec()
        .then(result => {
            console.log(result);
            response.status(202).json({
                message: 'Product updated successfully',
                product: result
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({error: err});
        });
});

/**DELETE */
router.delete('/:id', (request, response, next) => {
    const id = request.params.id;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result);
            response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({error: err});
        });
});

/**FIND */
router.get('/:id', (request, response, next) => {
    const id = request.params.id;
    Product.findById(id).exec().then(data => {
        console.log(data);
        if(data) {
            response.status(200).json(data);
        }else {
            response.status(404).json({message: `No valid entry found for ID: ${id}`});
        }
    }).catch(err => {
        console.log(err);
        response.status(500).json({error: err});
    });
});

/**LIST */
router.get('/', (request, response, next) => {
    Product.find()
        .exec()
        .then(data => {
            console.log(data);
            response.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({error: err});
        });
});

module.exports = router;