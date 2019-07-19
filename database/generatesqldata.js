const moment = require('moment');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const wstreamhomes = fs.WriteStream('homessql.csv');
const wstreambookings = fs.WriteStream('bookingssql.csv');

const generateBookings = max => Math.floor(Math.random() * Math.floor(max) + 1);

const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const prices = [225, 245, 250, 265, 275, 285, 295, 299, 325, 350, 365, 375, 385, 390, 395, 399, 425, 450, 465, 485, 499, 510, 525, 535, 550];

const cleaning = [100, 120, 125, 135, 145, 150, 165, 175, 185, 200];

const service = [150, 160, 170, 175, 180, 185, 195, 200, 205, 210];

const children = [0, 1, 2, 3];

const infants = [0, 1, 2];

const getNum = max => Math.floor(Math.random() * Math.floor(max));

let homeString = '';
let bookingString = '';
let x = 1;

wstreamhomes.write('home_id, cleaning_fee, owner_id, rating, reviews, room_rate, service_fee \n');

wstreambookings.write('confirm_number, check_in, check_out, guest_id, home_id, num_of_adults, num_of_children, num_of_infants \n');

for (let i = 1; i <= 10000000; i++) {
  const houseID = i;
  let checkin = moment().clone().add(randomNum(1, 5), 'days');
  let checkout = null;
  const roomRate = prices[getNum(25)];
  const cleaningfee = cleaning[getNum(10)];
  const servicefee = service[getNum(10)];
  const randomBookings = generateBookings(8);
  const owner = uuidv4().toString();
  const rating = randomNum(1, 6);
  const reviews = getNum(130);
  homeString += (`${houseID}, ${cleaningfee}, ${owner}, ${rating}, ${reviews}, ${roomRate}, ${servicefee} \n`);
  for (j = 0; j <= randomBookings; j++) {
    checkout = checkin.clone().add(randomNum(1, 6), 'days');
    const checkinFormat = checkin.format('YYYY-MM-DD');
    const checkoutFormat = checkout.format('YYYY-MM-DD');
    const confirmation = uuidv1().toString();
    const guestID = uuidv4().toString();
    const numOfAdults = randomNum(2, 10);
    const numOfChildren = children[getNum(4)];
    const numOfInfants = infants[getNum(3)];
    bookingString += (`${confirmation}, ${checkinFormat}, ${checkoutFormat}, ${guestID}, ${i}, ${numOfAdults}, ${numOfChildren}, ${numOfInfants} \n`);
    checkin = checkout.clone().add(randomNum(2, 25), 'days');
  }

  if (i % 100000 === 0) {
    wstreamhomes.write(homeString);
    console.log(`homes ${x} done`);
    wstreambookings.write(bookingString);
    console.log(`bookings ${x} batch done`);
    x++;
    homeString = '';
    bookingString = '';
  }


  if (i % 10000000 === 0) {
    console.log('successfully write data to csv');
  }
}
