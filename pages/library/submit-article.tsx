import type { NextPage } from 'next'
import Layout from '~/layout'
import Multiselect from '~/library/Multiselect'
import Type from './type'
import React, { useState } from 'react'
import axios from 'axios'

const SubmitArticle: NextPage = () => {
  const [tag] = useState<string[]>([
    'First Amendment',
    'Accountability',
    'Alternative Dispute Resolution',
    'Anonymity',
    'Applications',
    'Artificial Intelligence',
    'Blockchain',
    'Browsers',
    'Central Bank',
    'Civil Liability',
    'Commodities',
    'Confidentiality',
    'Compliance',
    'Computational Security',
    'Conflict Resolution Framework',
    'Consent Management',
    'Consumer Protection',
    'Consensus',
    'Crowdfunding',
    'Cryptocurrency',
    'Cryptography',
    'Cybersecurity',
    'DAO',
    'Data Management',
    'Data Provenance',
    'DDOS Attacks',
    'DeFi',
  ])
  const [typeOptions] = useState<string[]>([
    'Article',
    'Academic Journal',
    'Book',
    'Panel',
    'Twitter Thread',
    'Editorial',
    'Practical Law Guide',
    'Case Law',
  ])

  const [selectedTag, setSelectedTag] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [author, setAuthor] = useState('')
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')

  //email, author, link, notes, date, title
  const onSubmit = async () => {
    if (tag && tag.length > 0) {
      const result = await axios
        .post('http://localhost:1337/api/articles', {
          data: { topics: selectedTag, type: selectedTypes, email, author, link, notes, date, title },
        })
        .catch((error) => {
          console.log(error.response)
        })
      console.log(result)
    }
  }

  return (
    <Layout heading="Home" content="Homepage of the legal engineering guild.">
      <div className="bg-black l-screen text-white">
        <div className="absolute top-40 left-32">
          <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-8">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Email"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-12">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Title"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-16">
            <input
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Author"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-20">
            <input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Link"
            />
          </div>
          <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-24">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="text"
              datepicker-format="dd/mm/yyyy"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Publication Date in DD/MM/YYYY"
              aria-label="Full name"
            />
          </div>
          <div className="flex items-center border-grey-500 py-2 w-full relative top-24">
            <Type
              title="Type of Article"
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              typeOptions={typeOptions}
            />
          </div>
        </div>
        <div className=" absolute top-48 left-1/2">
          <div className="flex items-center border-grey-500 py-2 w-full">
            <Type
              title="Select tags for the Article"
              selectedTypes={selectedTag}
              setSelectedTypes={setSelectedTag}
              typeOptions={tag}
            />
          </div>
          <div className="flex items-center border-b border-grey-500 py-2 relative top-4">
            <input
              onChange={(e) => setNotes(e.target.value)}
              type="text"
              id="base-input"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
              placeholder="Notes/Summary of the Article."
            />
          </div>
          <div className="flex items-center py-2 relative left-60 top-40">
            <button
              onClick={onSubmit}
              type="button"
              className="mr-2 mb-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SubmitArticle
