const moment = require('moment');

// refactor to return 3 months of data

const cal = (bookings, callback) => {
  const first = moment().startOf('month').day();
  const numDays = moment().daysInMonth();
  const days = [];
  const grid = [[], [], [], [], []];
  const bookingsArr = JSON.parse(JSON.stringify(bookings));

  for (let i = 0; i < 35; i += 1) {
    const day = {
      val: null,
      status: null,
    };
    if (i === first) {
      day.val = moment().startOf('month');
    } else if (i > first && i < first + numDays) {
      day.val = days[i - 1].val.clone().add(1, 'days');
    }
    for (let j = 0; j < bookingsArr.length; j += 1) {
      const checkIn = moment(bookingsArr[j].check_in);
      const checkOut = moment(bookingsArr[j].check_out);
      if (day.val !== null) {
        if (day.val < moment().subtract(1, 'd')) {
          day.status = 'in past';
        } else if (day.val >= checkIn && day.val <= checkOut) {
          day.status = 'booked';
        } else if (day.status === null) {
          day.status = 'available';
        }
      }
    }
    days.push(day);
    const rowIdx = Math.floor(i / 7);
    grid[rowIdx].push(day);
  }

  if (!grid) {
    callback('failed to create calendar');
  } else {
    callback(null, grid);
  }
};

module.exports = {
  cal,
};
