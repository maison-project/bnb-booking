import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import BookingCalendar from './BookingCalendar.jsx';

const Wrapper = styled.section`
  padding-left: 24px
  padding-right: 24px
  margin: 0px
  border: 1px solid #e4e4e4
  box-sizing: border-box
  width: 376px
`;

const Price = styled.span`
  font-size: 22px
  font-family: Helvetica
`;

const Button = styled.button`
  font-family: Helvetica
  background-color: #FE5A5A
  color: white
  font-size: 16px
  line-height: 24px
  letter-spacing: normal
  font-weight: 800
  padding-top: 10px
  padding-bottom: 10px
  padding-right: 8px
  padding-left: 8px
  display: inline-block
  text-align: center
  cursor: pointer
  border-radius: 4px
  border-width: 2px
  border-style: solid
  border-color: #FE5A5A
  width: 180px
`;

const Calendar = styled.div`
  display: inline-block
`;

export default class BookingWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      checkin: {
        text: 'Check in',
        val: null,
      },
      checkout: {
        text: 'Check out',
        val: null,
      },
      view: null,
      guests: {
        text: '1 guest',
        val: 1,
      },
    };
    this.selectDate = this.selectDate.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.selectGuests = this.selectGuests.bind(this);
  }

  selectDate(dateVal) {
    const dateText = moment(dateVal).format('ddd, MMM D');
    const newView = (this.state.view === 'checkin') ? 'checkout' : 'checkin';
    this.setState({
      [newView]: {
        text: dateText,
        val: dateVal,
      },
      view: newView,
    });
  }

  selectGuests(event) {
    const guestsText = event.target.value;
    const guestsVal = guestsText[0];
    this.setState({
      guests: {
        text: guestsText,
        val: guestsVal,
      },
    });
  }

  submitBooking(event) {
    const { checkin, checkout, guests } = this.state;
    const home_id = 150;
    const user_id = 485;
    const check_in = moment(checkin.val).format('YYYY/MM/DD');
    const check_out = moment(checkout.val).format('YYYY/MM/DD');
    const price_per_night = 89;
    const no_guests = guests.val;
    const booking = [
      home_id,
      user_id,
      check_in,
      check_out,
      price_per_night,
      no_guests,
    ];
    this.props.postBooking(booking);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Wrapper>
          <div>
            <span>
              <Price>$89</Price>
            </span>
            <span> per night</span>
          </div>

          <div>
            <button type="button">
              <span>*****</span>
              <span> 105</span>
            </button>
          </div>

          <div>
            <div>--------------------</div>
          </div>

          <div>
            <form onSubmit={this.submitBooking}>

              <div>
                <label>
                  Dates
                </label>
              </div>

              <input type="text" value={this.state.checkin.text} />
              <input type="text" value={this.state.checkout.text} />

              <Calendar>
                <div>
                  <BookingCalendar
                    calendar={this.props.calendar}
                    selectDate={this.selectDate}
                  />
                </div>
              </Calendar>

              <div>
                <label>
                  Guests
                </label>
              </div>
              <select value={this.state.guests.text} onChange={this.selectGuests}>
                <option value="1 guest">1 guest</option>
                <option value="2 guests">2 guests</option>
                <option value="3 guests">3 guests</option>
                <option value="4 guests">4 guests</option>
                <option value="5 guests">5 guests</option>
              </select>

              <div>
                <Button>
                  <input type="submit" value="Book" />
                </Button>
              </div>

            </form>
          </div>
        </Wrapper>
      </div>
    );
  }
}
