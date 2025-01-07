// @ts-ignore
import './styles/fonts.css';
import './styles/style.css';
import EventsCell from "./cells/events-cell";
import BentoBox from "./app/components/BentoBox";
import { Button } from './components/Button';
import SignUpForm from './form';
import Categories from "./components/Categories";
import React, {useEffect, useState} from 'react';
import useEvents from "./hooks/useEvents";
import Map from './map'

const highlights = [{
  id: 1,
  title: 'Meet up with the ummah',
  description:
    'See what’s going on near you, attend, and enjoy a range of events.',
},
{
  id: 1,
  title: 'Worship with the ummah',
  description:
    'Boost your iman.',
}
]

function App() {
  const [highlightKey, setHighlightKey] = useState(0)
  const [, set] = useState()
  const { events, loading, error, getEvents, collectEventCategories } = useEvents();
  const location = "Northampton"

  let highlight = highlights[highlightKey]

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      await getEvents();
    };

    fetchEvents();
  }, [getEvents]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events) {
    return <div>Emprty...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let categories = collectEventCategories(events)


    return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
          <Button variant="outline">
            {location}
          </Button>
          {/*<Map/>*/}
          <h2
            id="highlighted-event"
            className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            {highlight.title}
          </h2>
          <p className="mt-4 text-lg/8 text-gray-600">{highlight.description}</p>
          <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
            <SignUpForm/>
            <Categories categories={categories}  />
          </div>
        </article>
        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            <EventsCell events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;