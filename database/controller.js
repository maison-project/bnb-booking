const pg = require('pg');

const pool = new pg.Pool({
  user: 'managemaison',
  host: 'localhost',
  database: 'maisonproject',
  password: 'mmproject1',
  port: '5432',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('failed');
  } else {
    console.log('successfully connected to database');
  }
});

// get all bookings
// const getBookings = (home_id, callback) => {
//   pool.query(`SELECT homes.home_id, homes.cleaning_fee, homes.owner_id, homes.rating, homes.reviews, homes.room_rate, homes.service_fee, bookings.check_in, bookings.check_out, bookings.num_of_adults, bookings.num_of_children, bookings.num_of_infants FROM homes INNER JOIN bookings ON bookings.home_id = homes.home_id WHERE bookings.home_id = ${home_id}`, (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

const getHomes = (home_id, callback) => {
  pool.query(`SELECT * FROM homes WHERE home_id=${home_id}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getBookingsOnly = (home_id, callback) => {
  pool.query(`SELECT * FROM bookings WHERE home_id=${home_id}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const addBooking = (data, callback) => {
  const {
    confirm_number, check_in, check_out, guest_id, home_id, num_of_adults, num_of_children, num_of_infants,
  } = data;

  pool.query(`INSERT INTO bookings (confirm_number, check_in, check_out, guest_id, home_id, num_of_adults, num_of_children, num_of_infants) VALUES ('${confirm_number}', '${check_in}', '${check_out}', '${guest_id}', ${home_id}, ${num_of_adults}, ${num_of_children}, ${num_of_infants})`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const updateBooking = (data, callback) => {
  const {
    check_in, check_out, home_id, confirm_number,
  } = data;

  pool.query(`UPDATE bookings SET check_in='${check_in}', check_out='${check_out}' WHERE confirm_number='${confirm_number}'`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


const deleteBooking = (data, callback) => {
  const { confirm_number } = data;
  pool.query(`DELETE FROM bookings WHERE confirm_number='${confirm_number}'`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


module.exports = {
  getBookingsOnly,
  getHomes,
  addBooking,
  updateBooking,
  deleteBooking,
  // getBookings,
};
