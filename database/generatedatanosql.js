const moment = require('moment');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const wstream = fs.createWriteStream('nosql.csv');
// random generator for bookings
const generateBookings = max => Math.floor(Math.random() * Math.floor(max) + 1);

const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const prices = [225, 245, 250, 265, 275, 285, 295, 299, 325, 350, 365, 375, 385, 390, 395, 399, 425, 450, 465, 485, 499, 510, 525, 535, 550];

const cleaning = [100, 120, 125, 135, 145, 150, 165, 175, 185, 200];

const service = [150, 160, 170, 175, 180, 185, 195, 200, 205, 210];

const children = [0, 1, 2, 3];

const infants = [0, 1, 2];

const getNum = max => Math.floor(Math.random() * Math.floor(max));
// random generator for checkin - checkout dates

// random generator for to add random dates
// const randomDays = (1, 5) => Math.random
// random generator for fees and guests

// const checkin = moment().clone().add(randomNum(1, 5), 'days');
// const regcheckin = checkin.format('LL');

// const checkout = checkin.clone().add(randomNum(1, 5), 'days');
// const checkoutR = checkout.format('LL');
// const checkin2 = checkout.clone().add(10, 'days'); // need to clone checkout
// const newCheckinformat = checkin2.format('LL');

// console.log('checkin: ', regcheckin);
// console.log('checkout: ', checkoutR);
// console.log('testNEWcheckin', checkin2);
// console.log('test new formatted', newCheckinformat);


let string = '';
let x = 1;
wstream.write('home_id, confirm_number, check_in, check_out, cleaning_fee, guest_id, number_of_adults, number_of_children, number_of_infants room_rate, service_fee \n');
for (let i = 1; i <= 10000000; i++) {
  const houseID = `0000${i}`; // string
  let checkin = moment().clone().add(randomNum(1, 5), 'days');
  let checkout = null;
  const roomRate = prices[getNum(25)];
  const cleaningfee = cleaning[getNum(10)];
  const servicefee = service[getNum(10)];
  const randomBookings = generateBookings(8);
  for (j = 0; j <= randomBookings; j++) {
    checkout = checkin.clone().add(randomNum(1, 5), 'days');
    const checkinFormat = checkin.format('L');
    const checkoutFormat = checkout.format('L');
    const confirmation = uuidv1().toString();
    const guestID = uuidv4().toString();
    const numOfAdults = randomNum(2, 10);
    const numOfChildren = children[getNum(4)];
    const numOfInfants = infants[getNum(3)];
    string += (`${houseID}, ${confirmation
    }, ${checkinFormat}, ${checkoutFormat}, ${cleaningfee}, ${guestID}, ${numOfAdults}, ${numOfChildren}, ${numOfInfants}, ${roomRate}, ${servicefee} \n`);
    checkin = checkout.clone().add(randomNum(2, 25), 'days');
  }

  if (i % 100000 === 0) {
    wstream.write(string);
    console.log(`${x} batch done`);
    x++;
    string = '';
  }


  if (i % 10000000 === 0) {
    console.log('successfully write data to csv');
  }
}

// wstream.write(string)
// console.log('success')
// console.log('houseid');
// console.log(string);
// console.log('successfully write data to csv');
