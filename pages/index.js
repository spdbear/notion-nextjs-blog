import Image from 'next/image'
import Container from '../components/Container'
import Link from 'next/link'
import { getNotionData } from '../lib/getNotionData'

export default function Home({ posts }) {
  return (
    <Container>
      <div className="max-w-2xl mx-auto mb-16">
        <div className="mb-16">
          <h1 className="font-bold text-3xl md:text-center w-full md:text-5xl tracking-tight mb-2 text-black mx-auto max-w-xl leading-loose">
            spdblog
          </h1>
          <p className="text-gray-700 mb-5 md:text-center max-w-xl mx-auto">
            これはブログです。
          </p>
        </div>
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-4 mt-8 text-black">
          Blog Posts
        </h2>

        {!posts.length && <p className="text-gray-600 mb-4">No posts found.</p>}

        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/${post.properties.Slug.rich_text[0].plain_text}`}>
              <a className="w-full">
                <div className="mb-8 w-full">
                  <h3 className="text-xl font-medium w-full text-gray-900">
                    {post.properties.Post.title[0].plain_text}
                  </h3>
                  <p className="text-gray-700 text-md">
                    {post.properties.Description.rich_text[0].plain_text}
                  </p>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID)

  return {
    props: {
      posts: database,
    },
  }
}
