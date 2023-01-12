import type { NextPage } from 'next'
import { useContractRead } from 'wagmi'
import { TRIBUTE_ROUTER_ABI, TRIBUTE_ROUTER_ADDRESS } from '~/constants'
import Layout from '~/layout'
import { ethers, BigNumber } from 'ethers'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/20/solid'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
]
const candidates = [
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: 'January 7, 2020',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
  },
  // More candidates...
]
const publishingOptions = [
  { name: 'Published', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { name: 'Draft', description: 'This job posting will no longer be publicly accessible.', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Applicants: NextPage = () => {
  const [selected, setSelected] = useState(publishingOptions[0])

  console.log('tributes', data, isLoading)
  return (
    <Layout heading="Join" content="Homepage of the legal engineering guild.">
      <div className="min-h-full">
        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Jobs
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Engineering
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Back End Developer
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Full-time
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Remote
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  $120k &ndash; $140k
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  Closing on January 9, 2020
                </div>
              </div>
            </div>
            <div className="mt-5 flex xl:mt-0 xl:ml-4">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Edit
                </button>
              </span>

              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  View
                </button>
              </span>

              <Listbox as="div" value={selected} onChange={setSelected} className="sm:ml-3">
                {({ open }) => (
                  <>
                    <Listbox.Label className="sr-only"> Change published status </Listbox.Label>
                    <div className="relative">
                      <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                        <div className="inline-flex divide-x divide-purple-600 rounded-md shadow-sm">
                          <div className="inline-flex items-center rounded-l-md border border-transparent bg-purple-500 py-2 pl-3 pr-4 text-white shadow-sm">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            <p className="ml-2.5 text-sm font-medium">{selected.name}</p>
                          </div>
                          <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-purple-500 p-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                            <span className="sr-only">Change published status</span>
                            <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          </Listbox.Button>
                        </div>
                      </div>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute left-0 z-10 mt-2 -mr-1 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                          {publishingOptions.map((option) => (
                            <Listbox.Option
                              key={option.name}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-purple-500' : 'text-gray-900',
                                  'cursor-default select-none p-4 text-sm',
                                )
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <div className="flex flex-col">
                                  <div className="flex justify-between">
                                    <p className={selected ? 'font-semibold' : 'font-normal'}>{option.name}</p>
                                    {selected ? (
                                      <span className={active ? 'text-white' : 'text-purple-500'}>
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </div>
                                  <p className={classNames(active ? 'text-purple-200' : 'text-gray-500', 'mt-2')}>
                                    {option.description}
                                  </p>
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  More
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h2 className="text-lg font-medium text-gray-900">Candidates</h2>

              {/* Tabs */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="mt-4 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  defaultValue={tabs.find((tab) => tab.current).name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                        )}
                      >
                        {tab.name}
                        {tab.count ? (
                          <span
                            className={classNames(
                              tab.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900',
                              'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                            )}
                          >
                            {tab.count}
                          </span>
                        ) : null}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Stacked list */}
            <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
              {candidates.map((candidate) => (
                <li key={candidate.email}>
                  <a href="#" className="group block">
                    <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full group-hover:opacity-75"
                            src={candidate.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-purple-600">{candidate.name}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span className="truncate">{candidate.email}</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Applied on <time dateTime={candidate.appliedDatetime}>{candidate.applied}</time>
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <CheckCircleIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                  aria-hidden="true"
                                />
                                {candidate.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Pagination */}
            <nav
              className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
              aria-label="Pagination"
            >
              <div className="-mt-px flex w-0 flex-1">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Previous
                </a>
              </div>
              <div className="hidden md:-mt-px md:flex">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  1
                </a>
                {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
                  aria-current="page"
                >
                  2
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  3
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  4
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  5
                </a>
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  6
                </a>
              </div>
              <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                  href="#"
                  className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                >
                  Next
                  <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>
        </main>
      </div>
    </Layout>
  )
}

// const Applicants: NextPage = () => {
const { data, isLoading, isSuccess } = useGetTributes()

//   console.log('tributes', data, isLoading, isSuccess)

//   return (
//     <Layout heading="Join" content="Homepage of the legal engineering guild.">
//       <div className="w-[100vw] flex flex-row items-center justify-between min-h-screen">
//         <div className="w-[30vw]">
//           {isSuccess &&
//             data &&
//             data.map((tribute: any) => (
//               // tailwind class for beautiful card
//               <div className="bg-white shadow-md rounded-lg p-4 m-4">
//                 <p>{tribute.id}</p>
//                 <button>
//                   <HandThumbUpIcon />
//                 </button>
//                 <button>
//                   <HandThumbDownIcon />
//                 </button>
//               </div>
//             ))}
//         </div>
//       </div>
//     </Layout>
//   )
// }

export default Applicants
