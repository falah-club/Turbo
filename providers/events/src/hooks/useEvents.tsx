import { useState, useCallback } from 'react';
import falah from "@falah-club/falah-kit";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // @ts-ignore
    const getEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedEvents = await falah().event.get()
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    loading,
    error,
    getEvents,
  };
}