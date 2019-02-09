const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/bookings/:homeId', (req, res) => {
  // console.log('GETTING BOOKINGS FOR ', req.params.homeId);
  db.getBookingsById(req.params.homeId, (err, bookings) => {
    if (err) {
      // TO DO
    } else {
      res.json(bookings);
    }
  });
});

app.get('/api/pricing/:homeId', (req, res) => {
  db.getPricingById(req.params.homeId, (err, pricing) => {
    if (err) {
      // send error
    } else {
      res.json(pricing);
    }
  });
});

app.post('/api/pricing/:homeId', (req, res) => {
  // get data from req object: user_id, check_in, check_out, price_per_night, no_guests
  const booking = req.params.homeId;
  db.createBooking(booking, (err) => {
    if (err) {
      // send error
    } else {
      res.send('success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
