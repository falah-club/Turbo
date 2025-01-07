import {useEffect} from "react";
import useEvents from "../hooks/useEvents";
import {Gradient} from "../app/components/gradient";
import {Container} from "../components/Container";
import {Subheading} from "../app/components/text";


function InnerEventCard({ event }) {
  // Format the start date
  const startDate = new Date(
    event.start[0],
    event.start[1] - 1,
    event.start[2],
    event.start[3],
    event.start[4]
  );

  // Format duration
  const durationHours = event.duration[0];
  const durationMinutes = event.duration[1];

  return (
      <>
        {/*{JSON.stringify(event)}*/}
      {/* Event Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Placeholder image */}
        <img
          src="https://via.placeholder.com/400x200"
          alt={`${event.title} event`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>

        {/* Date and Time */}
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>Date:</strong> {startDate.toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {startDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* Duration */}
        <p className="mt-2 text-sm text-gray-600">
          <strong>Duration:</strong> {durationHours} hours {durationMinutes} minutes
        </p>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-700">{event.description}</p>

        {/* Location */}
        <p className="mt-4 text-sm text-gray-700">
          <strong>Location:</strong> {event.location}
        </p>

        {/* Categories */}
        <p className="mt-2 text-sm text-gray-700">
          <strong>Categories:</strong> {event.categories.join(', ')}
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-50 rounded-lg px-6 py-4 flex justify-between items-center">
        {/* Link to Event */}
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 font-semibold hover:underline"
        >
          Learn More
        </a>

        {/* Event Status */}
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            event.status === 'Scheduled'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {event.status}
        </span>
      </div>
      </>
  );
}


function EventCard({ event }) {
  return (
    <div className="rounded-4xl shadow-md ring-1 ring-black/5 p-6 max-w-md mx-auto">
      <div className="rounded-3xl bg-white h-auto  p-8 shadow-lg">
        <InnerEventCard event={event} />
      </div>
    </div>
  );
}

{/* Event Link */}


function FeatureItem({
//    description,
//    disabled = false,
  }: {
//    description: string
//    disabled?: boolean
  }) {
    return (
      <></>
//      <li
//        data-disabled={disabled ? true : undefined}
//        className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-[disabled]:text-gray-950/25"
//      >
//        <span className="inline-flex h-6 items-center">
//          {/*<PlusIcon className="size-[0.9375rem] shrink-0 fill-gray-950/25" />*/}
//        </span>
//        {disabled && <span className="sr-only">Not included:</span>}
//        {description}
//      </li>
    )
  }
const EventsCell = ({events}) => {
  const eventKeys = Object.keys(events);

  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
        {eventKeys.map(key => {
        const event = events[key];
        return (
          <>
            <EventCard event={event} key={key}  />
          </>
        );
      })}
      </div>
        {/*<LogoCloud className="mt-24" />*/}
      </Container>
    </div>
  );
};

export default EventsCell