import React from 'react';
import ReactDOM from 'react-dom';
import BookingWidget from './BookingWidget.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: null,
    };
    this.getCalendar = this.getCalendar.bind(this);
    this.postBooking = this.postBooking.bind(this);
  }

  componentDidMount() {
    this.getCalendar();
  }

  getCalendar() {
    const homeId = 150;
    fetch('http://localhost:3002/api/bookings/' + homeId, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((calendar) => {
        this.setState({
          calendar: calendar,
        });
      });
  }

  postBooking(booking) {
    console.log(`${booking} was sent`);
    fetch('http://localhost:3002/api/bookings/', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({booking: booking}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
  }

  render() {
    return (
      <div>
        {this.state.calendar &&
          <div>
            <BookingWidget 
              calendar={this.state.calendar}
              postBooking={this.postBooking}
            />
          </div>
        }
      </div>
    );
  }
}
