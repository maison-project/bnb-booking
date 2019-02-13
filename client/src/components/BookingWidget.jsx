import React from 'react';
import styled from 'styled-components';

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
      checkin: 'Check in',
      checkout: 'Check out',
      view: null,
      guests: '1 guest',
    };
    this.selectDate = this.selectDate.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.selectGuests = this.selectGuests.bind(this);
  }

  selectDate(date) {
    const view = (this.state.view === 'checkin') ? 'checkout' : 'checkin';
    this.setState({
      [view]: date,
      view: view,
    });
  }

  selectGuests(event) {
    const guests = event.target.value;
    this.setState({
      guests: guests,
    });
  }

  submitBooking(event) {
    console.log(event);
    event.preventDefault();
    // this.props.postBooking(booking);
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

              <input type="text" value={this.state.checkin} />
              <input type="text" value={this.state.checkout} />

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
              <select value={this.state.guests} onChange={this.selectGuests}>
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
