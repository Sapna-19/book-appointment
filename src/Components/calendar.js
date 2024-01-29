// Calendar.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchTimeslots } from '../Services/apiService';
import { setTimeslots } from '../redux/actions';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import './calendar.css';

const CalendarComponent = ({ dispatch, timeslots }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDayDate, setSelectedDayDate] = useState('');

  useEffect(() => {
    const startDate = '2024-01-20';
    const endDate = '2024-01-30';

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchTimeslots(startDate, endDate);
        dispatch(setTimeslots(data));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const selectedDateSlots = timeslots.find((slot) => slot.date === selectedDateString);

    let newFilteredSlots = [];
    if (selectedDateSlots) {
      newFilteredSlots = selectedDateSlots.slots.filter((timeSlot) => {
        const slotDuration =
          (new Date(timeSlot.end_time) - new Date(timeSlot.start_time)) / (1000 * 60); // in minutes
        return slotDuration === selectedDuration;
      });
    }

    setFilteredSlots(newFilteredSlots);
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    setSelectedDayDate(selectedDate.toLocaleDateString('en-US', options));
  }, [selectedDate, timeslots, selectedDuration]);

  const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleTimeString([], options);
  };

  const handleSlotClick = (timeSlot) => {
    setSelectedSlots([timeSlot]);}

  const handleDurationChange = (event) => {
    setSelectedDuration(Number(event.target.value));
  };

  return (
    <div className='calendar-wrapper'>
      <div className="calendar-container">
        <div className="calendar-dates">
          <h3>Test Service</h3>
          <p>Timezone:<span className='timezone'>Asia/calcutta</span></p>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div className="time-slots">
          {/* <h3>{`Time Slots for ${selectedDate.toISOString().split('T')[0]}`}</h3> */}
          <div className="duration-dropdown">
            <label>Select FROM Variants</label>
            <select className='variant-dropdown' value={selectedDuration} onChange={handleDurationChange}>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
          </div>
          <div className="selected-day-date">
          {selectedDayDate && (
            <p>{`${selectedDayDate} - Available Slots`}</p>
          )}
        </div>
          {loading ? (
            <p>Loading...</p>
          ) : filteredSlots.length > 0 ? (
            <ul className='slots-available'>
              {filteredSlots.map((timeSlot) => (
                <li
                  key={timeSlot.start_time}
                  onClick={() => handleSlotClick(timeSlot)}
                  className={selectedSlots.includes(timeSlot) ? 'selected-slot' : ''}
                >
                  {`${formatTime(timeSlot.start_time)} - ${formatTime(timeSlot.end_time)}`}
                  {selectedSlots.includes(timeSlot) && (
                   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                   <path d="M11.25 15L13.75 17.5L18.75 12.5M3.75 15C3.75 16.4774 4.04099 17.9403 4.60636 19.3052C5.17172 20.6701 6.00039 21.9103 7.04505 22.955C8.08971 23.9996 9.3299 24.8283 10.6948 25.3936C12.0597 25.959 13.5226 26.25 15 26.25C16.4774 26.25 17.9403 25.959 19.3052 25.3936C20.6701 24.8283 21.9103 23.9996 22.955 22.955C23.9996 21.9103 24.8283 20.6701 25.3936 19.3052C25.959 17.9403 26.25 16.4774 26.25 15C26.25 13.5226 25.959 12.0597 25.3936 10.6948C24.8283 9.3299 23.9996 8.08971 22.955 7.04505C21.9103 6.00039 20.6701 5.17172 19.3052 4.60636C17.9403 4.04099 16.4774 3.75 15 3.75C13.5226 3.75 12.0597 4.04099 10.6948 4.60636C9.3299 5.17172 8.08971 6.00039 7.04505 7.04505C6.00039 8.08971 5.17172 9.3299 4.60636 10.6948C4.04099 12.0597 3.75 13.5226 3.75 15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No available time slots for this date and duration.</p>
          )}
        </div>
      </div>
      <div className='bottom-wrapper'>
        <p>Powered By Appointo</p>
        <button>Next<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 5L12.5 10L7.5 15" stroke="#378760" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  timeslots: state.main.timeslots,
});

export default connect(mapStateToProps)(CalendarComponent);
