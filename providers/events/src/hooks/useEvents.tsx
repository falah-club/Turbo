import { useState, useCallback } from 'react';
import falah from "@falah-club/falah";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function collectEventCategories(events: any[]) {
    const categories = new Set();

    // Iterate over the values of the events object
    for (const event of Object.values(events)) {
        // Check if the event has a 'categories' property and it's an array
        if (Array.isArray(event.categories)) {
            // Add each category to the Set
            for (const category of event.categories) {
                categories.add(category);
            }
        }
    }

    // Convert the Set to an array and return it
    return Array.from(categories);
}

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
    collectEventCategories
  };
}