const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllLines = function(callback) {
  const queryStr = 'SELECT * FROM `service_lines`';
  connection.query(queryStr, (err, lines) => {
    if (err) {
      callback(err);
    } else {
      callback(null, lines);
    }
  })
}

const getStopsById = function(lineId, callback) {
  const queryStr = 'SELECT * FROM `stations` INNER JOIN `stops` ON stops.line_id = ? && stations.id = stops.station_id';
  connection.query(queryStr, [lineId], (err, stops) => {
    if (err) {
      callback(err);
    } else {
      callback(null, stops);
    }
  })
}

const makeStopFav = function(stopId, callback) {
  connection.query(
    'SELECT stations.is_favorite FROM `stations` WHERE stations.id = ?',
    stopId,
    (err, favStatus) => {
      const newStatus = (favStatus[0].is_favorite === 0) ? 1 : 0;
      const queryStr = 'UPDATE `stations` SET stations.is_favorite = ? WHERE stations.id = ?';
      connection.query(queryStr, [newStatus, stopId], (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  );
}

const getAllStations = function(callback) {
  const queryStr = 'SELECT * FROM `stations` ORDER BY stations.is_favorite DESC';
  connection.query(queryStr, (err, stations) => {
    if (err) {
      callback(err);
    } else {
      callback(null, stations);
    }
  })
}

module.exports = {
  getAllLines,
  getStopsById,
  makeStopFav,
  getAllStations
};
