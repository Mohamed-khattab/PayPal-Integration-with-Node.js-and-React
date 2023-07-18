// paymentController.js

const Paypal = require('paypal-rest-sdk');
const Moment = require('moment');
const _ = require('lodash');
require('dotenv').config()

// Configure PayPal
Paypal.configure({
  mode: 'sandbox',
  client_id: process.env.CLIENT_ID,
  client_secret:process.env.SECRET_KEY
});

// Function to create a payment agreement
exports.createPaymentAgreement = function(req, res) {
  // Attributes for creating the billing plan of a user
  let billingPlanAttributes = {
    description: "Add about subscription details.",
    merchant_preferences: {
      auto_bill_amount: "yes",
      cancel_url: "http://localhost:3000/cancel",
      initial_fail_amount_action: "continue",
      max_fail_attempts: "1",
      return_url: "http://localhost:3000/success",
      setup_fee: {
        currency: "USD",
        value: "1"
      }
    },
    name: "Paypal Agreement",
    payment_definitions: [{
      amount: {
        currency: "USD",
        value: "25"
      },
      charge_models: [],
      cycles: "0",
      frequency: "MONTH",
      frequency_interval: 1,
      name: "Regular Payments",
      type: "REGULAR"
    }],
    type: "INFINITE"
  };

  // Once a billing plan is created, it must be updated with the following attributes
  let billingPlanUpdateAttributes = [{
    op: "replace",
    path: "/",
    value: {
      state: "ACTIVE"
    }
  }];

  // Attributes for creating the billing agreement
  // Start Date should be greater than the current time and date
  let startDate = Moment(new Date()).add(10, 'minute').format('gggg-MM-DDTHH:mm:ss') + 'Z';
  let billingAgreementAttributes = {
    name: "Name of Payment Agreement",
    description: "Description of your payment agreement",
    start_date: startDate,
    plan: {
      id: ""
    },
    payer: {
      payment_method: "paypal"
    }
  };

  // Creating the billing plan
  Paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to create billing plan.' });
    }

    // Updating the billing plan to activate it
    Paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, (error, response) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to update billing plan.' });
      }

      // Update the billing agreement attributes before creating it
      billingAgreementAttributes.plan.id = billingPlan.id;

      // Creating the billing agreement
      Paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Failed to create billing agreement.' });
        }

        // Redirecting to PayPal portal with approvalUrl
        const approvalUrl = _.find(billingAgreement.links, { rel: 'approval_url' }).href;
        return res.redirect(approvalUrl);
      });
    });
  });
}

// Function to process the payment agreement
exports.processPaymentAgreement = function(req, res) {
  const token = req.query.token;

  Paypal.billingAgreement.execute(token, {}, (error, billingAgreement) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to process payment agreement.' });
    }

    console.log(billingAgreement);
    return res.json({ message: "Successfully created the agreement." });
  });
}
