import React from 'react';
import moment from 'moment';

export default class BookingCalendar extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.selectDate(event.target.id);
  }

  render() {
    const { calendar } = this.props;
    return (
      <div>
        <div>
          February 2019
        </div>

        <div>
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        <table>
          {calendar.map((week) =>
            <tr>
              {week.map((day) =>
                <td id={day.val}
                  onClick={this.handleClick}
                >
                  {day.val && moment(day.val).format('D')}
                </td>
              )}
            </tr>
          )}
        </table>
      </div>
    );    
  }
}
