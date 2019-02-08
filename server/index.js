const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/lines', (req, res) => {
  db.getAllLines((err, lines) => {
    res.json(lines);
  })
});

app.get('/api/lines/:lineId', (req, res) => {
  db.getStopsById(req.params.lineId, (err, stops) => {
    res.json(stops);
  })
});

app.post('/api/lines/:stopId', (req, res) => {
  db.makeStopFav(req.params.stopId, (err) => {
    if (err) {
      //send error
    } else {
      res.send('success');  
    }
  })
});

app.get('/api/trips', (req, res) => {
  db.getAllStations((err, stations) => {
    res.json(stations);
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
