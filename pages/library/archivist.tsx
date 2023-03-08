import type { NextPage } from 'next'
import Layout from '~/layout'
import Card from '~/library/ArticleCard'

const Archivist: NextPage = () => {
  return (
    <Layout heading="Home" content="Homepage of the legal engineering guild.">
      <Card
        title="Title. My Blog Post"
        link="Link. https://myblog.com/post"
        notes="Notes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus vitae elit mollis luctus. Nulla facilisi."
        summary="Summary. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus vitae elit mollis luctus. Nulla facilisi."
        date="2023-03-07"
        author="Author"
        type="Type"
        topics={['Topic1', 'Topic 2']}
        contributors={['Contributor1', 'Contributor2']}
      />
    </Layout>
  )
}

export default Archivist
