const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const db = require('../database');
const { cal } = require('./calendarHelper');

const app = express();
const PORT = 3002;

app.use('/', expressStaticGzip(path.join(__dirname, '/../public'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/bookings/:homeId', (req, res) => {
  // console.log('getting bookings with homeId', homeId)
  db.getBookingsById(req.params.homeId, (err, bookings) => {
    if (err) {
      console.log('err from db');
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

app.post('/api/bookings', (req, res) => {
  const {booking} = req.body;
  // console.log(booking);
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
