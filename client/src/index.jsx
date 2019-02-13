import React from 'react';
import ReactDOM from 'react-dom';
import BookingWidget from './components/BookingWidget.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: null,
      updated: false,
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
      .then((grid) => {
        this.setState({
          calendar: grid,
        });
      });
    this.setState({
      updated: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.calendar &&
          <div>
            <BookingWidget calendar={this.state.calendar} />
          </div>
        } 
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
