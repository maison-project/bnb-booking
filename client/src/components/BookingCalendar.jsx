import React from 'react';
import moment from 'moment';

const BookingCalendar = (props) => {
  const { calendar } = props;
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
              <td>
                {moment(day.val).format('D')}
              </td>
            )}
          </tr>
        )}
      </table>
    </div>
  );
};

export default BookingCalendar;
