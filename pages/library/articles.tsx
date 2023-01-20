import type { NextPage } from 'next'
import Layout from '~/layout'
import axios from 'axios'

const Articles: NextPage = () => {
  const fetch = () => {
    axios.get('http://localhost:1337/api/articles').then((response) => {
      console.log(response.data.data)
    })
  }

  return (
    <Layout heading="Home" content="Homepage of the legal engineering guild." >
      <h1 className="text-3xl font-bold underline text-white">Articles</h1>
      <button className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" onClick={fetch}>
        fetch
      </button>
    </Layout>
  )
}

export default Articles
