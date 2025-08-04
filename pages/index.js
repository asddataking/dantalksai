import Layout from '../components/Layout'
import Hero from '../components/Hero'

const deals = [
  {
    title: 'AI Copywriter Pro',
    description: 'Save hours writing emails and posts with AI assistance.',
    href: '#',
  },
  {
    title: 'CRM Booster',
    description: 'Automate follow-ups and track leads effortlessly.',
    href: '#',
  },
  {
    title: 'Scheduler Plus',
    description: 'Let clients book themselves with smart scheduling.',
    href: '#',
  },
]

const articles = [
  {
    title: '5 Ways AI Can Close Sales While You Sleep',
    excerpt: 'Harness automation to nurture leads around the clock.',
    href: '#',
  },
  {
    title: 'Top 3 Tools for AI-Powered Booking',
    excerpt: 'Tools that handle scheduling so you can focus on clients.',
    href: '#',
  },
  {
    title: 'Why Your Funnel Needs an AI Agent',
    excerpt: 'An AI rep can answer questions and qualify leads instantly.',
    href: '#',
  },
]

export default function Home() {
  return (
    <Layout>
      <Hero />

      <section id="deals" className="py-20 px-4 bg-slate-900">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Deals</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {deals.map((deal) => (
            <div key={deal.title} className="bg-slate-800 rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">{deal.title}</h3>
              <p className="text-slate-300 flex-grow">{deal.description}</p>
              <a
                href={deal.href}
                className="mt-4 inline-block text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Get Deal
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="articles" className="py-20 px-4 bg-black">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Latest Articles</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="bg-slate-800 rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
              <p className="text-slate-300 flex-grow">{article.excerpt}</p>
              <a href={article.href} className="mt-4 text-indigo-400 hover:underline">
                Read More
              </a>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

