// paymentRouter.js

var express = require('express');
var paymentController = require('../Controller/servicesController');

var router = express.Router();

// Route for creating a payment agreement
router.post('/payment/agreement', paymentController.createPaymentAgreement);

// Route for processing the payment agreement
router.get('/payment/agreement/success', paymentController.processPaymentAgreement);

module.exports = router;
