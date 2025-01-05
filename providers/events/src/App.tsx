// @ts-ignore
import './styles/fonts.css';
import './styles/style.css';
import EventsCell from "./cells/events-cell";
import BentoBox from "./app/components/BentoBox";
import { Button } from './components/Button';
import SignUpForm from './form';
import Categories from "./components/Categories";
import React, { useEffect } from 'react';

const highlightedEvent = {
  id: 1,
  title: 'Meet up with the ummah',
  href: '#',
  description:
    'See what’s going on near you, attend, and enjoy a range of events.',
  date: 'Northampton',
  datetime: '2020-03-16',
  author: {
    name: 'RSS',
    href: '#',
    imageUrl:
      'https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/optimized/16/solid/arrow-down-right.svg',
  },
};

function App() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        <article className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
          <Button variant="outline">
            {highlightedEvent.date}
          </Button>
          <h2
            id="highlighted-event"
            className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            {highlightedEvent.title}
          </h2>
          <p className="mt-4 text-lg/8 text-gray-600">{highlightedEvent.description}</p>
          <Categories />
          <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
            <SignUpForm />
            <div className="flex lg:border-t lg:border-gray-900/10 lg:pt-8">
              <a href={highlightedEvent.author.href} className="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900">
                <img alt="" src={highlightedEvent.author.imageUrl} className="size-6 flex-none rounded-full bg-gray-50" />
                {highlightedEvent.author.name}
              </a>
            </div>
          </div>
        </article>
        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            <EventsCell />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;