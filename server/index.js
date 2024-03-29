const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
// const expressStaticGzip = require('express-static-gzip');


// const { cal } = require('./calendarHelper');
const cluster = require('cluster');
const numWorkers = require('os').cpus().length;
const redis = require('redis');
const db = require('../database/controller.js');

const client = redis.createClient();

// app.use('/', expressStaticGzip(path.join(__dirname, '/../public'), {
//   enableBrotli: true,
//   orderPreference: ['br', 'gz'],
// }));


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
const setupWorkerProcesses = () => {
  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} ended with code: ${code} and signal: ${signal}`);
    console.log('Starting new worker');
    cluster.fork();
  });
};

if (cluster.isMaster) {
  setupWorkerProcesses();
} else {
  const app = express();
  const PORT = process.env.PORT || 3002;
  app.use(express.static('public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });

  client.on('connect', (err) => {
    console.log('connected to redis');
  });

  app.get('/api/bookings/:home_id', (req, res) => {
    const selectedHome = req.params.home_id;
    client.get(selectedHome, (err, result) => {
      if (result) {
        res.send(JSON.parse(result));
      } else {
        db.getBookingsOnly(selectedHome, (err, data) => {
          if (err) {
            res.send('error with retrieval');
            res.status(404);
          } else {
            client.setex(selectedHome, 86500, JSON.stringify(data.rows));
            res.send(data.rows);
          }
        });
      }
    });
  });

  app.get('/api/homes/:home_id', (req, res) => {
    const selectedHome = req.params.home_id;
    client.get(selectedHome, (err, result) => {
      if (result) {
        res.send(JSON.parse(result));
      } else {
        db.getHomes(selectedHome, (err, data) => {
          if (err) {
            res.send('error retrieving home');
            res.status(404);
          } else {
            client.setex(selectedHome, 86500, JSON.stringify(data.rows));
            res.send(data.rows);
          }
        });
      }
    });
  });

  // app.get('/api/bookings/:home_id', (req, res) => {
  //   const selectedHome = req.params.home_id;
  //   db.getBookings(selectedHome, (err, data) => {
  //     if (err) {
  //       res.send('error with retrieval');
  //       res.status(404);
  //     } else {
  //       res.send(data.rows);
  //     }
  //   });
  // });

  app.post('/api/bookings', (req, res) => {
    const data = req.body;
    // console.log(data);
    db.addBooking(data, (err, results) => {
      if (err) {
        res.status(400);
        res.send('cannot complete booking');
      } else {
        res.status(202);
        res.send('successfully booked');
        // console.log('server received', results);
      }
    });
  });


  app.put('/api/bookings', (req, res) => {
    const data = req.body;
    // console.log('testing data', data);
    db.updateBooking(data, (err, results) => {
      if (err) {
        res.status(400);
        res.send('something went wrong, unable to update');
      } else {
        res.send('successfully updated booking');
      }
    });
  });

  app.delete('/api/bookings', (req, res) => {
    const data = req.body;
    db.deleteBooking(data, (err, results) => {
      if (err) {
        res.status(400);
        res.send('unable to access booking');
      } else {
        res.send('booking deleted');
      }
    });
  });
}


// app.post('/api/bookings', (req, res) => {
//   const { booking } = req.body;
//   // console.log(booking);
//   db.createBooking(booking, (err) => {
//     if (err) {
//       // send error
//     } else {
//       res.send('success');
//     }
//   });
// });
