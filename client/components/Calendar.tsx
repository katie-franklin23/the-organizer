import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getEvents, createEvent } from '../apis/Calendar';
import EventModel from '../../models/EventModel';
import '../../styles/index.scss';

moment.locale('en');
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const localizer = momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const handleCreateEvent = async () => {
    const eventData = {
      title: 'New Event',
      start: new Date(),
      end: new Date(),
    };

    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4" style={{ width: '400px', height: '400px' }}>
      <h2 className="text-lg font-semibold mb-4">Calendar Widget</h2>
      <div className="calendar">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleCreateEvent}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}

export default Calendar;
