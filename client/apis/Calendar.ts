import request from 'superagent';
import EventModel from '../../models/EventModel'; 

const baseURL = '/api/v1'; 

interface EventData {
  id: number;
  title: string;
  start: string; 
  end: string;
}

export async function getEvents(): Promise<EventModel[]> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await request.get(`${baseURL}/events`); 
    const eventData: EventData[] = response.body;

    const events = eventData.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));

    return events.map(
      (event) => new EventModel(event.id, event.title, event.start, event.end)
    );
  } catch (error) {
    throw error;
  }
}

export async function createEvent(eventData: {
  title: string;
  start: Date;
  end: Date;
}): Promise<EventModel> {
  // eslint-disable-next-line no-useless-catch
  try {
    const formattedEventData = {
      ...eventData,
      start: eventData.start.toISOString(),
      end: eventData.end.toISOString(),
    };

    const response = await request
      .post(`${baseURL}/events`)
      .send(formattedEventData);
    const event: EventData = response.body;

    const parsedEvent = {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    };

    return new EventModel(parsedEvent.id, parsedEvent.title, parsedEvent.start, parsedEvent.end);
  } catch (error) {
    throw error;
  }
}

