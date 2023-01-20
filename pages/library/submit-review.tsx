import type { NextPage } from 'next'
import Layout from '~/layout'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Features } from '~/lander'
import { FAQs } from '~/guilds'
import { ArticleForm } from '~/library/ArticleForm'

const SubmitReview: NextPage = () => {
  const [email, setEmail] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [countries, setCountries] = useState('')
  const [otherQualifications, setOtherQualifications] = useState('')

  return (
    <Layout heading="Library" content="The archives of the legal engineering guild." criteria>
      <div className="flex h-screen grid-cols-2 gap-2 my-12">
        <div className="mx-auto">
          <h1 className="font-inter text-black">Reviewer Qualifications</h1>
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
        <ArticleForm />
      </div>
    </Layout>
  )
}

export default SubmitReview
