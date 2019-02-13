const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('../database');
const { cal } = require('./calendarHelper');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/bookings/:homeId', (req, res) => {
  db.getBookingsById(req.params.homeId, (err, bookings) => {
    if (err) {
      // TO DO
    } else {
      cal(bookings, (error, grid) => {
        if (error) {
          console.log('no calendar');
        } else {
          res.json(grid);
        }
      });
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
