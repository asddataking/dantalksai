import Head from 'next/head'

export default function Home() {
  const year = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>Dan Talks AI - Real AI. Real Life. Let’s Build Something Wild.</title>
        <meta
          name="description"
          content="Dan Talks AI - real-world AI tools, experiments, and automation tutorials for creators, beginners, and curious minds."
        />
      </Head>
      <main className="bg-black text-gray-100 min-h-screen font-sans">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-6">
            Real AI. Real Life. Let’s Build Something Wild.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-8">
            Exploring AI tools, sharing exclusive deals, and writing about real-world automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#deals"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold text-center"
            >
              Browse Deals
            </a>
            <a
              href="#blog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-center"
            >
              Read Articles
            </a>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-purple-400">About Dan</h2>
            <p className="text-lg text-gray-300 mb-6">
              Dan is a U.S. Army veteran turned tech nerd and tortilla‑wrapped food lover. He simplifies AI for creators and
              small businesses with a friendly, grounded tone.
            </p>
          </div>
        </section>

        {/* Latest Videos Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">Latest Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['1', '2', '3'].map((i) => (
                <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-700 flex items-center justify-center">Video {i}</div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Video Title {i}</h3>
                    <p className="text-gray-400">Short description of the video goes here.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate Deals Section */}
        <section id="deals" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Featured Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'AI Course 50% Off',
                  description: 'Master AI fundamentals with this exclusive discount.',
                },
                {
                  title: 'Automation Toolkit',
                  description: 'Save hours with ready-made scripts and workflows.',
                },
                {
                  title: 'Design Assets Pack',
                  description: 'Beautiful UI assets for your next project.',
                },
              ].map((deal, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
                  <p className="text-gray-400 flex-grow">{deal.description}</p>
                  <a
                    href="#"
                    className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-center"
                  >
                    Get Deal
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Vault Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">The AI Vault</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Tool {i + 1}</h3>
                  <p className="text-gray-400">Description of AI tool {i + 1} and what it can do for you.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Articles Section */}
        <section id="blog" className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Getting Started with AI Automation',
                  excerpt: 'A beginner-friendly guide to automate workflows using AI tools.',
                },
                {
                  title: 'Top 5 AI APIs in 2024',
                  excerpt: 'We compare popular APIs to build your next AI app.',
                },
                {
                  title: 'Prompt Engineering Tips',
                  excerpt: 'Craft prompts that yield better results from large language models.',
                },
              ].map((post, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-400 flex-grow">{post.excerpt}</p>
                  <a href="#" className="mt-4 inline-block text-blue-400 hover:underline">
                    Read More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">
              Need AI in your biz? Let’s make it happen.
            </h2>
            <p className="text-gray-300 mb-6">
              Coming soon: AI consulting, automation audits, and micro‑SaaS tools powered by Go High Level.
            </p>
          </div>
        </section>

        {/* Email Signup Section */}
        <section className="py-16 px-4">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-purple-400">Get Dan’s AI Drops</h2>
            <p className="text-gray-300 mb-6">
              Weekly tool drops, memes, and experiments delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-3 rounded-md text-black"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-4 bg-gray-900 text-center text-gray-400">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
            <a href="#" className="hover:text-white">
              YouTube
            </a>
            <a href="#" className="hover:text-white">
              X (Twitter)
            </a>
            <a href="#" className="hover:text-white">
              Email
            </a>
          </div>
          <p>© {year} Dan Talks AI. Built with caffeine and cosmic code.</p>
        </footer>
      </main>
    </>
  )
}
