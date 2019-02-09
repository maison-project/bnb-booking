import React from 'react';
import ReactDOM from 'react-dom';
import BookingWidget from './components/BookingWidget.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
    this.getBookings = this.getBookings.bind(this);
  }

  getBookings() {
    const homeId = 150;
    fetch('/api/bookings/' + homeId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => { response.json(); })
      .then((bookings) => {
        console.log(bookings);
        this.setState({
          bookings: bookings
        });
      });
  }

  render() {
    return (
      <div>
        Hello
        <div>
          <BookingWidget getBookings={this.getBookings} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
