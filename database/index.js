const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = ({
  home_id: Number,
  user_id: Number,
  created_at: {type: Date, default: Date.now},
  check_in: Date,
  check_out: Date,
  price_per_night: Number,
  no_guests: Number
});

const pricingSchema = ({
  home_id: Number,
  host_id: Number,
  price_default: Number,
  price_special: Number,
  cleaning_fee: Number,
  service_fee: Number,
  occ_taxes: Number
});

const Booking = mongoose.model('Booking', bookingSchema);
const Pricing = mongoose.model('Pricing', pricingSchema); 