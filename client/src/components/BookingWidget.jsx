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
  z-index: 1
  position: absolute
  top: 51px
  left: 0px
`;


export default class BookingWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      calView: false,
      checkin: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // change state to conditionally render calendar
    this.setState({
      calView: true,
    });
    // find target and insert html for calendar
    console.log(this.props.calendar);
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
            <form>

              <div>
                <label>
                  Dates
                </label>
              </div>
              <input type="text" value="Check in" onClick={this.handleClick} />
              <input type="text" value="Check out" />

              <Calendar>
                <div>
                  <BookingCalendar calendar={this.props.calendar} />
                </div>
              </Calendar>

              <div>
                <label>
                  Guests
                </label>
              </div>
              <input type="text" value="1 guest" />

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
