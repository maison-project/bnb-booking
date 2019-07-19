CREATE KEYSPACE reservations WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1 };

-- CREATE TABLE reservations.homes (
--   home_id int,
--   rating int,
--   number_of_reviews int,
--   room_rate int,
--   cleaning_fee int,
--   service_fee int,
--   PRIMARY KEY (home_id)

-- );

CREATE TABLE reservations.bookings_by_home (
  home_id text,
  confirm_number text,
  check_in text,
  check_out text,
  guest_id text,
  room_rate int,
  cleaning_fee int,
  service_fee int,
  number_of_adults int,
  number_of_children int,
  number_of_infants int,
  PRIMARY KEY (home_id, confirm_number)
);


COPY bookings_by_home(home_id, confirm_number, check_in, check_out, cleaning_fee, guest_id, number_of_adults, number_of_children, number_of_infants, room_rate, service_fee) FROM '/Users/stellazhang/Desktop/Bnbproject/booking-module/nosql.csv' WITH HEADER = TRUE;




INSERT INTO test.bookings_by_homeID (home_id, confirm_number, check_in, check_out, guest_id, room_rate, cleaning_fee, service_fee, number_of_adults, number_of_children, number_of_infants) VALUES (uuid(), now(), '2019-07-02', '2019-07-05', uuid(), 425, 125, 100, 5, 2, 0);

INSERT INTO test.bookings_by_homeID (home_id, confirm_number, check_in, check_out, guest_id, room_rate, cleaning_fee, service_fee, number_of_adults, number_of_children, number_of_infants) VALUES (uuid(), now(), '2019-07-20', '2019-07-24', uuid(), 300, 150, 150, 4, 1, 0);


/* GET */
SELECT * FROM bookings_by_home WHERE home_id = '00001378497' AND confirm_number='9c92fbd4-a0f9-11e9-ab40-8d86f00ad856';


/* POST */
INSERT INTO reservations.bookings_by_home (home_id, confirm_number, check_in, check_out, cleaning_fee, guest_id, number_of_adults, number_of_children, number_of_infants, room_rate, service_fee) VALUES ('00008993300', 'abcd-8882-4242-hrtr-3095', '11/28/2019', '11/30/2019', 100, 'abcd-lgee-3092-de23-3192', 2, 0, 1, 180, 55);

