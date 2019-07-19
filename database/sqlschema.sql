CREATE TABLE homes (
  home_id serial PRIMARY KEY,
  cleaning_fee SMALLINT,
  owner_id uuid,
  rating SMALLINT,
  reviews SMALLINT,
  room_rate SMALLINT,
  service_fee SMALLINT
);
/*
consider putting owner id in for future 
*/

CREATE TABLE bookings (
  confirm_number uuid,
  guest_id uuid,
  check_in DATE,
  check_out DATE,
  home_id INTEGER REFERENCES homes(home_id),
  num_of_adults SMALLINT,
  num_of_children SMALLINT,
  num_of_infants SMALLINT
);


CREATE TABLE homes (home_id SERIAL PRIMARY KEY, cleaning_fee SMALLINT, owner_id TEXT, rating SMALLINT, reviews SMALLINT, room_rate SMALLINT, service_fee SMALLINT
);

CREATE TABLE bookings (confirm_number TEXT, check_in DATE, check_out DATE, guest_id TEXT, home_id int REFERENCES homes(home_id), num_of_adults SMALLINT, num_of_children SMALLINT, num_of_infants SMALLINT
);


COPY homes FROM '/Users/stellazhang/Desktop/Bnbproject/booking-module/homessql.csv' DELIMITER ',' CSV HEADER;

COPY bookings FROM '/Users/stellazhang/Desktop/Bnbproject/booking-module/bookingssql.csv' DELIMITER ',' CSV HEADER;

INSERT INTO homes (home_id,cleaning_fee,owner_id,rating,reviews,room_rate,service_fee) VALUES (1, 100, 'eeee-30', 5, 90, 350, 100);

INSERT INTO bookings (confirm_number, check_in, check_out, guest_id, home_id, num_of_adults, num_of_children, num_of_infants) VALUES ('eeee-20-10', '2019-07-25', '2019-07-30', 'eeee-93432-5325', 1, 5, 2, 1);


/* POST */
INSERT INTO bookings (confirm_number, check_in, check_out, guest_id, home_id, num_of_adults, num_of_children, num_of_infants) VALUES (uuid_generate_v4(), '2019-09-23', '2019-09-26', uuid_generate_v4(), 6500, 8, 2, 1);

/* DELETE */
DELETE FROM bookings WHERE home_id=17577 AND (confirm_number = 'c2fbd91a-a99f-11e9-8f32-216f826ced3d');

/*UPDATE */

UPDATE bookings SET num_of_adults = 8 WHERE home_id=6550111 AND confirm_number = '345989a8-a9a2-11e9-8f32-216f826ced3d';
