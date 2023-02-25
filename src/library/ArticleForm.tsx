import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Features } from '~/lander'
import { FaRegStar, FaStar } from 'react-icons/fa'

export const ArticleForm = () => {
  const [array, setArray] = useState([])
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
  const [rating, setRating] = useState(0)
  const [ratings, setRatings] = useState<Record<string, number>>({})
  //Weak Arguments
  const [errorArgument, setErrorArgument] = useState('')
  const [error, setError] = useState('')
  const [stars, setStars] = useState([
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
    { id: 4, checked: false },
    { id: 5, checked: false },
  ])

  let article: any
  const onSubmit = async () => {
   axios
      .get('http://localhost:1337/api/articles')
      .then((response) => {
        console.log(response.data.data.title)
        const articles = response.data.data
        article = articles.filter((item: any) => item['attributes']['title'] === title)
        console.log(article[0].attributes.topics, "topics",)
        setArray(article[0].attributes.topics)
      })
      .catch((error) => {
        console.log(error)
        setError('Article not found. Please enter a valid article.')
      }) 
  }

  const handleClick = (topic: string, rating: number): void => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [topic]: rating,
    }));
  };


  const handleCheck = (id: any, topic: any) => {
    setRating(id)
    setRatings({ ...ratings, [topic]: id })

    setStars((prev) =>
      prev.map((star) => {
        if (star.id <= id) {
          return { ...star, checked: true }
        }
        return { ...star, checked: false }
      }),
    )
  }
  

  useEffect(() => {
    //onSubmit();
  }, [title])

  return (
    <div className="">
      <h1 className="font-inter text-black">Article Feedback</h1>
      <div className="flex items-center border-b border-grey-500 w-[600px]">
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
      <div className="mt-6">
        <span className=" mr-3 w-full px-2 leading-tight text-gray-500 focus:border-transparent focus:ring-0">
          How many pages is the article?
        </span>
      </div>
      <div className="flex py-1 px-2 items-center">
        <input
          id="default-radio-1"
          type="radio"
          value="1-5"
          name="numpages"
          onChange={(e) => setNumpages(e.target.value)}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
        />
        <span className="text-s font-normal text-gray-500 px-1 ">1-5</span>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="6-20"
            name="numpages"
            onChange={(e) => setNumpages(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1 ">6-20</span>
        </div>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="21-50"
            name="numpages"
            onChange={(e) => setNumpages(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1 ">21-50</span>
        </div>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="51-100"
            name="numpages"
            onChange={(e) => setNumpages(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">51-100</span>
        </div>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="100+"
            name="numpages"
            onChange={(e) => setNumpages(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">100+</span>
        </div>
      </div>
      <div className="border-b border-grey-500 w-full my-4 py-2">
        <input
          onChange={(e) => setJurisdictions(e.target.value)}
          type="text"
          id="base-input"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
          placeholder="What is the primary jurisdiction(s) of this content?"
        />
      </div>
      <div className=" mt-6 w-full">
        <span className=" mr-3  w-full py-1 px-2 leading-tight text-gray-500 focus:border-transparent focus:ring-0">
          Is this discussion related to Common Law or Civil Law?
        </span>
      </div>
      <div className="flex items-center py-1 px-4">
        <input
          id="default-radio-1"
          type="radio"
          value="Common Law"
          name="law"
          onChange={(e) => setLaw(e.target.value)}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
        />
        <span className="text-s font-normal text-gray-500 px-1">Common Law</span>

        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="Civil Law"
            name="law"
            onChange={(e) => setLaw(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">Civil Law</span>
        </div>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="Not Applicable"
            name="law"
            onChange={(e) => setLaw(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">Not Applicable</span>
        </div>
      </div>
      <div className=" mt-6  ">
        <span className="mr-3 w-full py-1 px-2 leading-tight text-gray-500 focus:border-transparent focus:ring-0">
          If the piece is of a legal nature, is this topic supported by law and enforceable as of the date of the
          review?
        </span>
      </div>
      <div className="flex items-center  py-1 px-4 ">
        <input
          id="default-radio-1"
          type="radio"
          value="true"
          name="legalenforceable"
          onChange={(e) => setLegallyEnforceable(e.target.value)}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
        />
        <span className="text-s font-normal text-gray-500 px-1">Yes</span>
        <div className="flex items-center px-24">
          <input
            id="default-radio-1"
            type="radio"
            value="false"
            name="legalenforceable"
            onChange={(e) => setLegallyEnforceable(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">No</span>
        </div>
      </div>
      <div className=" border-b border-grey-500 w-[740px] mt-6 py-1 ">
        <input
          onChange={(e) => setRulings(e.target.value)}
          type="text"
          id="base-input"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
          placeholder="What are the rulings or codes (law) that the article referring to in order to make this enforceable?"
        />
      </div>
      <div className="border-b border-grey-500 w-[600px] mt-6 py-1 ">
        <input
          onChange={(e) => setImpact(e.target.value)}
          type="text"
          id="base-input"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
          placeholder="Please describe the impact of this decision in the given jurisdiction"
        />
      </div>
      <div className=" w-[600px] mt-6 py-1 ">
        <span className="mr-3 w-full py-1 px-2 leading-tight text-gray-500 focus:border-transparent focus:ring-0">
          How qualified is the author of the piece on the subject?
        </span>
      </div>
      <div className="flex items-center relative px-4 ">
        <input
          id="default-radio-1"
          type="radio"
          value="Very Qualified"
          name="qualification"
          onChange={(e) => setAuthorQualification(e.target.value)}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
        />
        <span className="text-s font-normal text-gray-500 px-1">Very Qualified</span>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="Moderately Qualified"
            name="qualification"
            onChange={(e) => setAuthorQualification(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">Moderately Qualified</span>
        </div>
        <div className="flex items-center px-2">
          <input
            id="default-radio-1"
            type="radio"
            value="Not Qualified"
            name="qualification"
            onChange={(e) => setAuthorQualification(e.target.value)}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-brand-600 focus:ring-2  focus:ring-brand-500"
          />
          <span className="text-s font-normal text-gray-500 px-1">Not Qualified</span>
        </div>
      </div>
      <div className=" w-[600px] mt-6 py-1 ">
        <span className="mr-3 w-full py-1 px-2 leading-tight text-gray-500 focus:border-transparent focus:ring-0">
          How would you rate the article for each of its relevant topics and tags? (5=Excellent and 1=Bad)
        </span>
      </div>

      {array
        ? array.map((topic: any, key: any) => (
            <div key={key} className="flex">
              <div className=" flex items-center m-3">
                <p className="text-gray-500">{topic}</p>
                <div className="ml-4">
                {[1, 2, 3, 4, 5].map((rating) => (
            <FaStar
              key={rating}
              className={`cursor-pointer ${
                rating <= ratings[topic.toLowerCase()]
                  ? "inline-block h-6 w-6 rounded-full text-yellow-500"
                  : "inline-block h-6 w-6 rounded-full text-yellow-200"
              }`}
              onClick={() => handleClick(topic.toLowerCase(), rating)}
            />
          ))}
                </div>
              </div>
            </div>
          ))
        : null}

      <div className=" border-grey-500 mt-6 w-[500px] border-b py-1 ">
        <input
          onChange={(e) => setErrorArgument(e.target.value)}
          type="text"
          id="base-input"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight border-transparent focus:border-transparent focus:ring-0"
          placeholder="Are there any errors that the Author commits or weak arguments?"
        />
      </div>
    </div>
  )
}
