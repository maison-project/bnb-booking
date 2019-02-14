import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Weekdays = styled.div`
  padding-top: 1px
  padding-bottom: 1px
  width: 300px
`;

const Weekday = styled.span`
  font-size: 12px
  padding-right: 14px
  padding-left: 14px
  width: 32px
`;

const Month = styled.table`
  padding-top: 2px
  padding-bottom: 2px
  width: 300px
`;

const Day = styled.td`
  font-size: 14px
  padding-top: 8px
  padding-bottom: 8px
  padding-right: 4px
  padding-left: 8px
  width: 32px
  border: 1px solid #e4e4e4
`;

export default class BookingCalendar extends React.Component {
  constructor() {
    super();
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
  }

  handleDateClick(event) {
    const dayVal = event.target.id;
    this.props.selectDate(dayVal);
  }

  handleMonthClick(event) {
    this.props.changeMonth();
  }

  render() {
    const { calendar } = this.props;
    return (
      <div>

        <div>
          <span>
            <input type="button" onClick={this.handleMonthClick} />
          </span>

          <span>
            {moment(calendar[1][0].val).format('MMMM YYYY')}
          </span>

          <span>
            <input type="button" onClick={this.handleMonthClick} />
          </span>
        </div>

          <Weekdays>
            <Weekday>Su</Weekday>
            <Weekday>Mo</Weekday>
            <Weekday>Tu</Weekday>
            <Weekday>We</Weekday>
            <Weekday>Th</Weekday>
            <Weekday>Fr</Weekday>
            <Weekday>Sa</Weekday>
          </Weekdays>

        <Month>
          {calendar.map((week) =>
            <tr>
              {week.map((day) =>
                <Day
                  id={day.val}
                  onClick={day.status === 'available' ? this.handleDateClick : undefined}
                >
                  {day.val && moment(day.val).format('D')}
                </Day>
              )}
            </tr>
          )}
        </Month>
      </div>
    );    
  }
}
