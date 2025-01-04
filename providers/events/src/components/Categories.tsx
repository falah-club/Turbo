//import { ChevronDownIcon } from '@heroicons/react/16/solid'
//import { PlusIcon } from '@heroicons/react/20/solid'

const people = [
  {
    "name": "Studies",
    "description": "Weekly or special sermons delivered by the imam, focusing on spiritual and community topics.",
    "imageUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Sports",
    "description": "Organized sports activities promoting physical health and fostering brotherhood.",
    "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Youth",
    "description": "Workshops and events aimed at developing leadership skills among Muslim youth.",
    "imageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Sisters' Halaqa",
    "description": "Informal gatherings for women to discuss Islamic topics and build a supportive community.",
    "imageUrl": "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Family",
    "description": "Sessions for families to come together and learn Quranic teachings.",
    "imageUrl": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Ibadah",
    "description": "Sessions for families to come together and learn Quranic teachings.",
    "imageUrl": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    "name": "Charity",
    "description": "Events for giving back to the community through food drives, clean-ups, and more.",
    "imageUrl": "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
]

export default function Categories() {
  return (
    <div className="mx-auto max-w-md sm:max-w-3xl">
      <div>
        <div className="text-center">

        </div>

      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">Categories</h3>
        <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {people.map((person, personIdx) => (
            <li key={personIdx}>
              <button
                type="button"
                className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="flex min-w-0 flex-1 items-center space-x-3">
                  <span className="block shrink-0">
                    {/*<img alt="" src={person.imageUrl} className="size-10 rounded-full" />*/}
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-900">{person.name}</span>
                    {/*<span className="block truncate text-sm font-medium text-gray-500">{person.description}</span>*/}
                  </span>
                </span>
                <span className="inline-flex size-10 shrink-0 items-center justify-center">
                  {/*<PlusIcon aria-hidden="true" className="size-5 text-gray-400 group-hover:text-gray-500" />*/}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
