import type { NextPage } from 'next'
import Layout from '~/layout'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

const Archivist: NextPage = () => {
  return (
    <Layout heading="Library" content="The archives of the legal engineering guild." criteria={false}>
      <div className="hidden sm:ml-6 sm:block">
        <div className="h-screen flex space-x-4">
          <div className="w-[200px] h-[80px] bg-gray-900 text-white px-8 py-4 rounded-md text-xl font-bold">
            <Link href="/library/type">Collections</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Archivist
