for (let i = 100; i < 200; i++) {
  let user_id = Math.round(Math.random()*400 + 200);
  let check_in = '2019-03-06'; 
  let check_out = '2019-03-08';
  let price_per_night = Math.round(Math.random()*500 + 50);
  let no_guests = Math.round(Math.random()*4 + 1);

  console.log(
    `INSERT INTO bookings (home_id, user_id, check_in, check_out, price_per_night, no_guests) VALUES (${i}, ${user_id}, '${check_in}', '${check_out}', ${price_per_night}, ${no_guests});`
  )
}