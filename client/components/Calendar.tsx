import { useEffect, useState } from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { getEvents, createEvent } from '../apis/Calendar'
import EventModel from '../../models/EventModel'
import '../styles/tailwind.css'
import Draggable from 'react-draggable'

moment.locale('en')
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

const localizer = momentLocalizer(moment)

function Calendar() {
  const [events, setEvents] = useState<EventModel[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error))
  }, [])

  const handleCreateEvent = async () => {
    if (selectedDate) {
      const eventData = {
        title: 'New Event',
        start: selectedDate,
        end: selectedDate,
      }

      try {
        const newEvent = await createEvent(eventData)
        setEvents([...events, newEvent])
      } catch (error) {
        console.error('Error creating event:', error)
      }
    }
  }

  return (
    <Draggable>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
        }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)}
            style={{ width: '265px', height: '265px' }}
            views={['month', 'week', 'day']}
            components={{
              toolbar: (props) => (
                <div className="bg-gray-100 p-3 rounded-lg shadow-md">
                  <div className="font-semibold text-lg text-gray-800">
                    {props.label}
                  </div>
                  <div className=" space-x-2 mt-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-sm"
                      onClick={() => props.onNavigate('PREV')}
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-sm"
                      onClick={() => props.onNavigate('NEXT')}
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      className="mb-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-sm"
                      onClick={() => props.onView('month')}
                    >
                      Month
                    </button>
                    <button
                      type="button"
                      className="mb-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-sm"
                      onClick={handleCreateEvent}
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </Draggable>
  )
}

export default Calendar
