import type { NextPage } from 'next'
import Layout from '~/layout'
import { GetStaticProps} from 'next'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link';
import SubmitArticle from './library/submit-article';
import SubmitReview from './library/submit-review';
import Navbar from '../src/navbar';



const Library: NextPage = () => {

  return (
        <Layout heading="library" content="Homepage of the legal engineering guild." criteria={true}>
         
    

           {/* <div className=" bg-black h-full min-h-screen text-white flex flex-row">
            <div className='absolute top-10 left-10 font-Arsenal font-normal text-5xl'>
          <h1 className='font-Arsenal'>Library</h1>
       </div>
        <div className='absolute top-14 left-1/4 font-Arsenal font-normal text-2xl'>
        <Link href="/library/catalogue" >Catalogue</Link>
        </div>
        <div className='absolute top-14 left-1/2 font-Arsenal font-normal text-2xl'>
        <Link href="/library/submit-article" >Submit Article</Link>
        </div>
        <div className='absolute top-14 left-3/4 font-Arsenal font-normal text-2xl'>
        <Link href="/library/submit-review" >Submit Article Review</Link>
        </div>
        <SubmitReview/>
        </div> */}
        </Layout>


  )
}

export default Library
