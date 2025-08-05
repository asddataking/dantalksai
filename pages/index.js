import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Form from '../components/Form'
import BlogPosts from '../components/BlogPosts'
import Footer from '../components/Footer'
import { getPosts } from '../lib/ghost'

const deals = [
  {
    title: 'AI CRM Suite',
    description: '50% off first year for DanTalksAI readers.',
    link: '#',
  },
  {
    title: 'Automated Lead Finder',
    description: 'Get 30% lifetime discount on all plans.',
    link: '#',
  },
]

export default function Home({ posts }) {
  const router = useRouter()
  return (
    <Layout>
      <Hero />
      <div id="contact">
        <Form onSuccess={() => router.push('/thank-you')} />
      </div>
      <BlogPosts posts={posts} />
      <section id="deals" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Deals</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {deals.map((deal) => (
            <div key={deal.title} className="p-6 rounded-xl bg-slate-900/60 border border-slate-700">
              <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
              <p className="mb-4 text-slate-300">{deal.description}</p>
              <a
                href={deal.link}
                className="inline-block px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-600 transition"
              >
                Get Deal
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: { posts },
    revalidate: 60,
  }
}
