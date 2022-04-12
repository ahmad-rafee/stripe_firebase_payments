var express = require('express');
var router = express.Router();
const { find, update } = require('../backend/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.get('/form/:id?', async function (req, res, next) {
  let payment = {};
  try {
    payment = await find(req.params.id, 'payments');
  } catch (error) {
    return res.render('error', error)
  }
  const intent = await stripe.paymentIntents.create({
    amount: payment.amount,
    currency: process.env.CURRENCY,
    automatic_payment_methods: { enabled: true },
  });
  res.render('payment_form', { client_secret: intent.client_secret, public_key: process.env.STRIPE_PUBLIC_KEY, id: req.params.id });
});
router.get('/done/:id?', async function (req, res, next) {
  try {
    await update(req.params.id, { status: 1 }, 'payments');
  } catch (error) {
    return res.render('error', error)
  }
  res.render('payment_done');
});

module.exports = router;
