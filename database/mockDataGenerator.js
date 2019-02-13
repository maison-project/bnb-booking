const moment = require('moment');

for (let i = 100; i < 200; i++) {
  let user_id = Math.round(Math.random()*400 + 200);
  let check_in = moment().clone().add(1, 'days');
  let check_in2 = check_in.clone().add(7, 'days');
  let check_in3 = check_in2.clone().add(8, 'days');
  let check_in4 = check_in3.clone().add(7, 'days');
  let check_out = check_in.clone().add(3, 'days');
  let check_out2 = check_out.clone().add(7, 'days');
  let check_out3 = check_out2.clone().add(8, 'days');
  let check_out4 = check_out3.clone().add(7, 'days');
  let price_per_night = Math.round(Math.random()*500 + 50);
  let no_guests = Math.round(Math.random()*4 + 1);

  check_in = check_in.format('YYYY/MM/DD');
  check_in2 = check_in2.format('YYYY/MM/DD');
  check_in3 = check_in3.format('YYYY/MM/DD');
  check_in4 = check_in4.format('YYYY/MM/DD');
  check_out = check_out.format('YYYY/MM/DD');
  check_out2 = check_out2.format('YYYY/MM/DD');
  check_out3 = check_out3.format('YYYY/MM/DD');
  check_out4 = check_out4.format('YYYY/MM/DD');

  console.log(
    `INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (${i}, ${user_id}, '${check_in}', '${check_out}', ${price_per_night}, ${no_guests});`
  );
  console.log(
    `INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (${i}, ${user_id}, '${check_in2}', '${check_out2}', ${price_per_night}, ${no_guests});`
  );
  console.log(
    `INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (${i}, ${user_id}, '${check_in3}', '${check_out3}', ${price_per_night}, ${no_guests});`
  );
  console.log(
    `INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (${i}, ${user_id}, '${check_in4}', '${check_out4}', ${price_per_night}, ${no_guests});`
  );
}
