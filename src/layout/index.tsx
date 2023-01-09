import Head from 'next/head'
import Navbar from '~/navbar'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'

type LayoutProps = {
  heading: string
  content: string
  children: React.ReactNode
  criteria: boolean
}

export default function Layout({ heading, content, children, criteria }: LayoutProps) {
  const title = 'LexDAO - ' + heading

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white dark:bg-black min-h-screen flex-col space-between align-center">
        <Header />
        {children}
        <Nav />
        {criteria ? <Navbar/> : null}
        <Footer />
      </div>
    </>
  )
}
