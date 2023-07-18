// paymentService.js

const Paypal = require('paypal-rest-sdk');

// Configure PayPal
Paypal.configure({
  mode: 'sandbox',
  client_id: process.env.CLIENT_ID,
  client_secret:process.env.SECRET_KEY
});

// Function to create a billing plan
exports.createBillingPlan = function(billingPlanAttributes, callback) {
  Paypal.billingPlan.create(billingPlanAttributes, callback);
}

// Function to update a billing plan
exports.updateBillingPlan = function(planId, billingPlanUpdateAttributes, callback) {
  Paypal.billingPlan.update(planId, billingPlanUpdateAttributes, callback);
}

// Function to create a billing agreement
exports.createBillingAgreement = function(billingAgreementAttributes, callback) {
  Paypal.billingAgreement.create(billingAgreementAttributes, callback);
}
