import { useState } from "react";
// @ts-ignore
import axios from "axios";
import {APIURL} from "../../api";


export default function useEventsHook() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all events (Read)
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${APIURL}/event/`);
      setEvents(response.data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new event (Create)
  const createEvent = async (newEvent:Event) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${APIURL}/events/`, newEvent);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing event (Update)
  const updateEvent = async (eventId: string, updatedEvent: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${APIURL}/events/${eventId}`, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? response.data : event))
      );
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete an event (Delete)
  const deleteEvent = async (eventId:string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${APIURL}/events/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.uid !== eventId));
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events on component mount
//  useEffect(() => {
//    fetchEvents();
//  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}