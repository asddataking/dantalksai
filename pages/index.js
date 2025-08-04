import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Form from '../components/Form'
import Footer from '../components/Footer'

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

const articles = [
  {
    title: 'How to Automate Sales Calls',
    excerpt: 'Use AI to scale your outreach without hiring a team.',
    link: '#',
  },
  {
    title: 'Top Tools for Booking Appointments',
    excerpt: 'Our favorite platforms to keep your calendar full.',
    link: '#',
  },
]

export default function Home() {
  const router = useRouter()
  return (
    <Layout>
      <Hero />
      <div id="contact">
        <Form onSuccess={() => router.push('/thank-you')} />
      </div>
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
      <section id="articles" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Latest Articles</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <div key={article.title} className="p-6 rounded-xl bg-slate-900/60 border border-slate-700">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="mb-4 text-slate-300">{article.excerpt}</p>
              <a href={article.link} className="text-indigo-400 hover:text-indigo-300">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </Layout>
  )
}
