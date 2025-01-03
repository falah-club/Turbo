import React from "react";
import {useEventsHook} from "../index";

export default function FetchEvents() {
  const { loading, events, fetchEvents, error } = useEventsHook();

  if (error) {
    return (
      <div>
        <p>An error occurred: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    fetchEvents().then(r => console.log(r))
    return (
      <div>
        <p>No events found.</p>
      </div>
    );
  }

  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}