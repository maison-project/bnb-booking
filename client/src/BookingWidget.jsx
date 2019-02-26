import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import BookingCalendar from './BookingCalendar.jsx';

const Select = styled.select`
  background-color: white;
  border: none;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 18px;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-weight: 250;
  text-align: left;
  color: gray;
  width: 312px;
`;

const Text = styled.div`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-top: 16px;
  margin-bottom: 5px;
`;

const Box = styled.div`
  border: 1px solid #EBEBEB;
  text-align: center;
`;

const DateInput = styled.input`
  border: none;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 18px;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-weight: 250;
  width: 140px;
  outline: none;
  color: ${props => (props.value === 'Check in' || props.value === 'Check out') ? 'gray' : undefined};
  background: ${props => props.selected ? '#99ede6' : undefined};
`;

const PricePerNight = styled.div`
  margin: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
`;

const Line = styled.div`
  border-bottom-width: 1px;
  border-bottom-color: #EBEBEB;
  border-bottom-style: solid;
  margin-bottom: 10px;
`;

const Wrapper = styled.section`
  padding-left: 24px;
  padding-right: 24px;
  margin: 0px;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 376px;
  background-color: white;
`;

const Price = styled.span`
  font-size: 22px;
  font-weight: 800;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
`;

const BookButton = styled.button`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  background-color: #FE5A5A;
  color: white;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: normal;
  font-weight: 800;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 8px;
  padding-left: 8px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #FE5A5A;
  width: 326px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const ReviewButton = styled.button`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 5px;
  border: none;
`;

const Calendar = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  align: center;
  font-size: 18px;
  font-weight: 800;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 8px;
  padding-left: 8px;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
  width: 315px;
  margin-top: 8px;
`;

export default class BookingWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      view: null,
      checkin: {
        text: 'Check in',
        val: null,
      },
      checkout: {
        text: 'Check out',
        val: null,
      },
      guests: {
        text: '1 guest',
        val: 1,
      },
      isCalOpen: false,
    };
    this.selectDate = this.selectDate.bind(this);
    this.submitBooking = this.submitBooking.bind(this);
    this.selectGuests = this.selectGuests.bind(this);
    this.openCal = this.openCal.bind(this);
    this.checkInOrOut = this.checkInOrOut.bind(this);
    this.closeCal = this.closeCal.bind(this);
  }

  openCal() {
    this.setState({
      isCalOpen: true,
    });
  }

  closeCal() {
    this.setState({
      isCalOpen: false,
      view: null,
    });
  }

  checkInOrOut(event) {
    const currView = event.target.id;
    this.setState({
      view: currView,
      isCalOpen: true,
    });
  }

  selectDate(dateVal) {
    const dateText = moment(dateVal).format('MM/DD/YYYY');
    const { view, checkin, checkout } = this.state;

    if (view === 'checkin' && checkout.val) {
      if (dateVal >= checkout.val) {
        this.setState({
          checkout: {
            text: 'Check out',
            val: null,
          },
        });
      } else {
        this.closeCal();
      }
    }

    if (view === 'checkout' && checkin.val) {
      if (dateVal <= checkin.val) {
        this.setState({
          checkin: {
            text: 'Check in',
            val: null,
          },
        });
      } else {
        this.closeCal();
      }
    }

    this.setState({
      [view]: {
        text: dateText,
        val: dateVal,
      },
      view: view === 'checkin' ? 'checkout' : 'checkin',
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
    if (event.target.id === 'book') {
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
  }

  render() {
    const { calendar } = this.props;
    const { checkin, checkout, view } = this.state;

    return (
      <div>
        <Wrapper>
          <PricePerNight>
            <span>
              <Price>$122</Price>
            </span>
            <Text>per night</Text>
            <div>
              <ReviewButton>
                <span>*****</span>
                <span> 105</span>
              </ReviewButton>
            </div>
          </PricePerNight>

          <Line />

          <div>
            <form onSubmit={this.submitBooking}>

              <Text>
                Dates
              </Text>

              <Box>
                <DateInput
                  type="text"
                  id="checkin"
                  value={checkin.text}
                  onClick={this.checkInOrOut}
                  selected={view === 'checkin'}
                />
                <DateInput
                  type="text"
                  id="checkout"
                  value={checkout.text}
                  onClick={this.checkInOrOut}
                  selected={view === 'checkout'}
                />
              </Box>

              {this.state.isCalOpen && <Calendar>
                <div>
                  <BookingCalendar
                    calendar={calendar}
                    selectDate={this.selectDate}
                    closeCal={this.closeCal}
                    checkin={checkin}
                    checkout={checkout}
                  />
                </div>
              </Calendar>}

              <Text>
                Guests
              </Text>

              <Box>
                <div>
                  <Select value={this.state.guests.text} onChange={this.selectGuests}>
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="3 guests">3 guests</option>
                    <option value="4 guests">4 guests</option>
                    <option value="5 guests">5 guests</option>
                  </Select>
                </div>
              </Box>

              <div>
                <BookButton id="book" onClick={this.submitBooking}>
                  Book
                </BookButton>
              </div>

              <Text>
                You won&#39;t be charged yet
              </Text>

            </form>
          </div>
        </Wrapper>
      </div>
    );
  }
}
