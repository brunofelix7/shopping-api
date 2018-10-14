const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

mongoose.connect(`mongodb://admin:${process.env.MLAB_PASSWORD}@ds131963.mlab.com:31963/shopping`);

//  Log request
app.use(morgan('dev'));

//  Parser JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  CORS handling
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(request.method === 'OPTIONS' || request.method === 'PATCH') {
        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return response.status(200).json({
            message: "Only GET, POST, PUT, DELETE are allowed."
        });
    }
    next();
});

//  Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//  Error handling
app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//  Error handling
app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;