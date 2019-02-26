import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 10px;
  padding: 20px;
`;

const MonthNameRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:space-between
  vertical-align: middle;
`;

const MonthName = styled.div`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  display: inline-block
  text-align: center
  width: 200px
`;

const MonthButton = styled.button`
  text-align: center
  background-color: white
  border: 1px solid #e4e4e4
  display: inline-block
  padding-top: 8px
  padding-bottom: 8px
  width: 40px
  height: 33px
  color: gray
  cursor: pointer
  font-size: 11px;
`;

const Weekdays = styled.table`
  width: 100%
`;

const Weekday = styled.td`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  text-align: center
  box-sizing: border-box
  width: 42px
  border: 1px
`;

const WeekdayName = styled.small`
  font-size: 12px
  color: gray
  font-weight: 400;
`;

const Month = styled.table`
  padding-top: 2px
  padding-bottom: 2px
  width: 100%
  border-collapse: collapse
`;

const Day = styled.td`
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  font-size: 14px
  text-align: center
  padding-top: 8px
  padding-bottom: 8px
  border: ${props => props.id ? '1px solid #e4e4e4' : undefined};
  cursor: ${props => props.status === 'available' ? 'pointer' : undefined}
  &:hover ${props => props.id !== props.checkin ? '{ background-color: #e0dede }' : undefined};
  background-color: ${props => props.id && props.id === props.checkin ? '#34929b' : undefined}
  color: white;
  text-decoration: ${props => props.status !== 'available' ? 'line-through' : undefined};
  text-decoration-color: ${props => props.status !== 'available' ? '#d8d8d8' : undefined};
  color: ${props => props.status !== 'available' ? '#d8d8d8' : undefined};
`;

export default class BookingCalendar extends React.Component {
  constructor(props) {
    super(props);
    const { calendar } = this.props;
    this.state = ({
      currMonth: calendar[3],
    });
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleGlobalClick = this.handleGlobalClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleGlobalClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  handleGlobalClick(event) {
    const isInputClick = event.target.id === 'checkin' || event.target.id === 'checkout';
    const calNode = ReactDOM.findDOMNode(this);
    if (!calNode.contains(event.target) && !isInputClick) {
      this.props.closeCal();
    }
  }

  handleDateClick(event) {
    const dayVal = event.target.id;
    this.props.selectDate(dayVal);
  }

  handleMonthClick(event) {
    event.preventDefault();
    const { calendar } = this.props;
    const { currMonth } = this.state;
    const nextMonth = calendar[calendar.indexOf(currMonth) + 1];
    const prevMonth = calendar[calendar.indexOf(currMonth) - 1];
    if (event.target.id === 'next' && nextMonth) {
      this.setState({
        currMonth: nextMonth,
      });
    } else if (event.target.id === 'prev' && prevMonth) {
      this.setState({
        currMonth: prevMonth,
      });
    }
  }

  render() {
    const { currMonth } = this.state;
    const { checkin, checkout } = this.props;
    return (
      <Container>
        <div>
          <MonthNameRow>
            <MonthButton id="prev" onClick={this.handleMonthClick}>
            Prev
            </MonthButton>
            <MonthName>
              {moment(currMonth[1][0].val).format('MMMM YYYY')}
            </MonthName>
            <MonthButton value="Next" id="next" onClick={this.handleMonthClick}>
            Next
            </MonthButton>
          </MonthNameRow>
        </div>

        <Weekdays>
          <Weekday><WeekdayName>Su</WeekdayName></Weekday>
          <Weekday><WeekdayName>Mo</WeekdayName></Weekday>
          <Weekday><WeekdayName>Tu</WeekdayName></Weekday>
          <Weekday><WeekdayName>We</WeekdayName></Weekday>
          <Weekday><WeekdayName>Th</WeekdayName></Weekday>
          <Weekday><WeekdayName>Fr</WeekdayName></Weekday>
          <Weekday><WeekdayName>Sa</WeekdayName></Weekday>
        </Weekdays>

        <Month>
          {currMonth.map((week) =>
            <tr>
              {week.map((day) =>
                <Day
                  id={day.val}
                  onClick={day.status === 'available' ? this.handleDateClick : undefined}
                  status={day.status}
                  checkin={checkin.val}
                  checkout={checkout.val}
                >
                  {day.val && moment(day.val).format('D')}
                </Day>
              )}
            </tr>
          )}
        </Month>
      </Container>
    );
  }
}
