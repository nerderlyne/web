import type { NextPage } from 'next'
import Layout from '~/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SubmitReview: NextPage = () => {
  const [email, setEmail] = useState('')
  const [array, setArray] = useState([])
  const [qualifications, setQualifications] = useState('')
  const [countries, setCountries] = useState('')
  const [otherQualifications, setOtherQualifications] = useState('')
  const [title, setTitle] = useState('')
  const [numpages, setNumpages] = useState('')
  const [jurisdictions, setJurisdictions] = useState('')
  const [legallyEnforceable, setLegallyEnforceable] = useState('')
  const [law, setLaw] = useState('')
  const [rulings, setRulings] = useState('')
  const [impact, setImpact] = useState('')
  //Muliple
  const [authorQualification, setAuthorQualification] = useState('')
  //text
  const [authorQualifications, setAuthorQualifications] = useState('')
  const [ratings, setRatings] = useState({})
  //Weak Arguments
  const [errorArgument, setErrorArgument] = useState('')
  const [error, setError] = useState('')

  let article: any
  const onSubmit = async () => {
    axios
      .get('http://localhost:1337/api/articles')
      .then((response) => {
        console.log(response.data.data.title)
        const articles = response.data.data
        article = articles.filter((item: any) => item['attributes']['title'] === title)
        console.log(article[0].attributes.topics)
        setArray(article[0].attributes.topics)
      })
      .catch((error) => {
        console.log(error)
        setError('Article not found. Please enter a valid article.')
      })
  }

  useEffect(() => {
    //onSubmit();
  }, [title])

  return (
    <Layout heading="Library" content="The archives of the legal engineering guild." criteria={true}>
      <div className="bg-black l-screen text-white">
        <div className="absolute top-40 left-32">
          <h1 className="font-inter">Reviewer Qualifications</h1>
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
            <div className="flex items-center border-b border-grey-500 py-2 relative top-20">
              <input
                onChange={(e) => setQualifications(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="What are your qualifications?"
              />
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-32">
              <input
                onChange={(e) => setCountries(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-80 text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="What countries are you qualified in?"
              />
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-44">
              <input
                onChange={(e) => setOtherQualifications(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-80 text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="Any other relevant qualifications details?"
              />
            </div>
        </div>
        <div className="absolute top-32 left-[600px] w-px h-2/3 bg-gray-600"></div>

        <div className="absolute top-36 left-1/2">
          <h1 className="font-inter">Article Feedback</h1>
          <form className="w-full">
            <div className="flex items-center border-b border-grey-500 py-2 w-full relative top-8">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-full dark:text-gray-400 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="Title of the Article"
                aria-label="Full name"
              />
              <button
                className="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-gray-200 text-sm py-1 px-2 rounded"
                type="button"
                onClick={onSubmit}
              >
                Search
              </button>
              {error !== null ? (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{error}</label>
              ) : null}
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-12">
              <button
                id="dropdownNavbarButton"
                type="button"
                data-dropdown-toggle="dropdownNavbar"
                className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-500 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-gray-200 md:p-0 md:w-auto dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-200 md:dark:hover:bg-transparent"
              >
                How many pages is the article?
                <svg
                  className="ml-1 w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-16">
              <input
                onChange={(e) => setJurisdictions(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-[400px] text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="What is the primary jurisdiction(s) of this content?"
              />
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-20 w-full">
              <input
                onChange={(e) => setLaw(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="Is this discussion related to Common Law or Civil Law?"

              />
            </div>
            {/* <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="Common Law"
                name="law"
                onChange={(e) => setLaw(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              /> 
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Common Law
              </label>
              <input
                id="default-radio-1"
                type="radio"
                value="Civil Law"
                name="law"
                onChange={(e) => setLaw(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Civil Law
              </label>
              <input
                id="default-radio-1"
                type="radio"
                value="Not Applicable"
                name="law"
                onChange={(e) => setLaw(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Not Applicable
              </label>
            </div> */}
            <div className="flex items-center border-b border-grey-500 py-2 relative top-24">
              <input
                onChange={(e) => setLegallyEnforceable(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-[600px] text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="If the piece is of a legal nature, is this topic supported by law and enforceable as of the date of the
    review?"
              />
            </div>

            {/* <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                value="true"
                name="legalenforceable"
                onChange={(e) => setLegallyEnforceable(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className=" ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Yes
              </label>
              <input
                id="default-radio-1"
                type="radio"
                value="false"
                name="legalenforceable"
                onChange={(e) => setLegallyEnforceable(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className=" ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                No
              </label>
            </div> */}
            <div className="flex items-center border-b border-grey-500 py-2 relative top-28">
              <input
                onChange={(e) => setRulings(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-[600px] text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="What are the rulings or codes (law) that the article referring to in order to make this enforceable?"
              />
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-32 w-128">
              <input
                onChange={(e) => setImpact(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="Please describe the impact of this decision in the given jurisdiction"
              />
            </div>
            <div className="flex items-center border-b border-grey-500 py-2 relative top-36">
              <input
                onChange={(e) => setAuthorQualification(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="How qualified is the author of the piece on the subject?"
              />
            </div>

            {/* <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Very Qualified
              </label>
              <input
                id="default-radio-1"
                type="radio"
                value="Moderately Qualified"
                name="qualification"
                onChange={(e) => setAuthorQualification(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Moderately Qualified
              </label>
              <input
                id="default-radio-1"
                type="radio"
                value="Not Qualified"
                name="qualification"
                onChange={(e) => setAuthorQualification(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium font-sans text-gray-900 dark:text-gray-300"
              >
                Not Qualified
              </label> */}
            <div className="flex items-center border-b border-grey-500 py-2 relative top-40">
              <input
                onChange={(e) => setRatings(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-80 text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="How would you rate the article for each of its relevant topics and tags? (5= Excellent and 1=Bad)"
              />
            </div>

            {/* {array
                ? array.map((topic: any, key: any) => (
                    <div key={key} className="flex">
                      <div className="flex items-center mr-4">
                        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{topic}</p>
                        <input
                          id="inline-radio"
                          type="radio"
                          value="1"
                          name={topic}
                          onChange={(e) => setRatings({ ...ratings, [topic]: e.target.value })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                          id="inline-radio"
                          type="radio"
                          value="2"
                          name={topic}
                          onChange={(e) => setRatings({ ...ratings, [topic]: e.target.value })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                          id="inline-radio"
                          type="radio"
                          value="3"
                          name={topic}
                          onChange={(e) => setRatings({ ...ratings, [topic]: e.target.value })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                          id="inline-radio"
                          type="radio"
                          value="4"
                          name={topic}
                          onChange={(e) => setRatings({ ...ratings, [topic]: e.target.value })}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <input
                          id="inline-radio"
                          type="radio"
                          value="5"
                          name={topic}
                          onChange={(e) => setRatings({ ...ratings, [topic]: e.target.value })}
                          className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  ))
                : null} */}
            <div className="flex items-center border-b border-grey-500 py-2 relative top-44">
              <input
                onChange={(e) => setErrorArgument(e.target.value)}
                type="text"
                id="base-input"
                className="appearance-none bg-transparent border-none w-80 text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
                placeholder="Are there any errors that the Author commits or weak arguments?"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default SubmitReview
