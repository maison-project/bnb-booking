import React from 'react';
import ReactDOM from 'react-dom';
import BookingWidget from './BookingWidget.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: null,
    };
  }

  componentDidMount() {
    this.getCalendar();
  }

  getCalendar() {
    const homeId = 150;
    fetch('/api/bookings/' + homeId, {
      method: 'GET',
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
    fetch('/api/bookings/', {
      method: 'POST',
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

ReactDOM.render(<App />, document.getElementById('app'));
