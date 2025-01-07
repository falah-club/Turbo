//import { ChevronDownIcon } from '@heroicons/react/16/solid'
//import { PlusIcon } from '@heroicons/react/20/solid'

export default function Categories({categories}) {
  return (
    <div className="mx-auto max-w-md sm:max-w-3xl">
      <div>
        {/*{JSON.stringify(categories)}*/}
        <div className="text-center">

        </div>

      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">Categories</h3>
        <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((category, personIdx) => (
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
                    <span className="block truncate text-sm font-medium text-gray-900">{category}</span>
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
