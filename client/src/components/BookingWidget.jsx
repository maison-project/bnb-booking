import React from 'react';
import BookingCalendar from './BookingCalendar.jsx';

class BookingWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      checkin: null,
      checkout: null,
      guests: 1
    };
  }
  render() {
    return (
      <div>Container

        <div>Price
          per night
        </div>

        <div>Calendars
          <div>
            <span onClick={this.props.getBookings}>Checkin
            </span>
            <span>Checkout
            </span>
          </div>
        </div>

        <div>Select
          <button>Select Guests</button>
        </div>

        <div>Button
          <button>Book</button>
        </div>

      </div>
    )
  }
}

export default BookingWidget;