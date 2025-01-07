import { useId, useState } from 'react'
import { Button } from './components/Button'
import {api} from './routes'
import { Dialog, DialogPanel, DialogBackdrop, Combobox, ComboboxOptions, ComboboxOption } from '@headlessui/react'
import {
  BellAlertIcon,
  CalendarIcon,
  CodeBracketIcon,
  DocumentIcon,
  EnvelopeIcon,
  LanguageIcon,
  RssIcon,
  XMarkIcon
} from "@heroicons/react/16/solid";
import clsx from "clsx";

const items = [
  { id: 2, name: 'Calendar', description: 'Embed and manage calendar events and schedules.', url: '#', color: 'bg-blue-500', icon: CalendarIcon },
  { id: 3, name: 'RSS Feed', description: 'Display and manage RSS feed updates.', url: '#', color: 'bg-green-500', icon: RssIcon },
  { id: 4, name: 'Iframe', description: 'Embed external websites or content using an iframe.', url: '#', color: 'bg-gray-500', icon: DocumentIcon, disabled: true },
  { id: 5, name: 'Email', description: 'Set up email capture forms or send notifications.', url: '#', color: 'bg-red-500', icon: EnvelopeIcon },
  { id: 6, name: 'Webhooks', description: 'Connect and trigger external systems with webhooks.', url: '#', color: 'bg-yellow-500', icon: CodeBracketIcon, disabled: true },
  { id: 7, name: 'Custom Component', description: 'Add custom components for unique use cases.', url: '#', color: 'bg-purple-500', icon: LanguageIcon, disabled: true },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

function SubscribeOptions({ setPage, setOption }) {
  return (
    items.length > 0 && (
      <ComboboxOptions static className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3">
        {items.map((item) => (
          <ComboboxOption
            key={item.id}
            disabled={item.disabled}
            onClick={() => {setPage(1)
               setOption(item.name)}}
            value={item}
            className="group flex cursor-default select-none rounded-xl p-3 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            <div className={classNames('flex size-10 flex-none items-center justify-center rounded-lg', item.color)}>
              <item.icon className="size-6 text-white" aria-hidden="true" />
            </div>
            <div className="ml-4 flex-auto">
              <p className="text-sm font-medium text-gray-700 group-data-[focus]:text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 group-data-[focus]:text-gray-700">{item.description}</p>
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    )
  );
}

function SubscribeInstructions({option = ""}) {

  function getAPIPath() {
    switch (option) {
        case "Calendar":
            return '/subscription/calendar';
        default:
            return ""; // Optionally handle unknown cases
    }
}

  return (
    <div className="bg-gradient-to-t from-indigo-700 to-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Get informed of new events.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
            Allow us to keep you up to date of when a new event has been created for this search filter.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {api + getAPIPath()}
            </a>
            <a href="/rss" className="text-sm/6 font-semibold text-white">
              Copy <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Subscribe({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
const [option, setOption] = useState()
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setPage(0), 500);
    setQuery('');
  };

  return (
    <Dialog
      className="relative z-10"
      open={open}
      onClose={handleClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel
          transition
          className={
            // Objects
clsx({
  "divide-y divide-gray-100": page === 0, // Ensure to use `===` for strict equality
  "mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in":
    true,
})            //=> 'foo baz'
          }

        >
          <Combobox onChange={(item) => { if (item) window.location = item.url }}>
            <div className="grid grid-cols-1">
              <XMarkIcon
                onClick={() => (page > 0 ? setPage(page - 1) : handleClose())}
                className="col-start-2 row-start-1 mr-4 size-5 self-center text-gray-400"
                aria-hidden="true"
              />
              <div
                autoFocus
                className="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
                onBlur={() => setQuery('')}
              />
            </div>
            {page === 0 && <SubscribeOptions setOption={setOption} setPage={setPage} />}
            {page === 1 && <SubscribeInstructions option={option} />}
          </Combobox>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default function SignUpForm() {
  const [openSubscribePallet, setOpenSubscribePallet] = useState(false);

  return (
    <>
      <Subscribe open={openSubscribePallet} setOpen={setOpenSubscribePallet} />
      <span className="relative isolate mt-8 flex items-center pr-1">
        <Button onClick={() => setOpenSubscribePallet(!openSubscribePallet)} arrow>
          Get Updates
          <BellAlertIcon />
        </Button>
      </span>
    </>
  );
}