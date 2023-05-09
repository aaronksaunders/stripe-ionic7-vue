const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createPaymentIntent } = require('./createPaymentIntent');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', createPaymentIntent);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
