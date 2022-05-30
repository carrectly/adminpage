import React from 'react';
import { useDispatch } from 'react-redux';
import { getEventsThunk } from '../store/calendar';

const CalendarView = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button type="button" onClick={() => dispatch(getEventsThunk())}>
        Get Events
      </button>
      <div>
        <iframe
          className="calendar"
          src="https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%238E24AA&amp;ctz=America%2FChicago&amp;src=aW5mb0BjYXJyZWN0bHkuY29t&amp;color=%2322AA99&amp;showPrint=0"
          frameBorder="1"
          scrolling="yes"
        ></iframe>
      </div>
    </div>
  );
};

export default CalendarView;
