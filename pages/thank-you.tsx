import Layout from '../components/Layout'

export default function ThankYou() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Watch This Before You Leave</h1>
        <div className="w-full max-w-2xl aspect-video mb-8">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <a
          href="#"
          className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition"
        >
          Book a Strategy Call
        </a>
        <p className="mt-4 text-sm text-slate-300">
          Questions? DM{' '}
          <a
            href="https://x.com/DanRichmondAI"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @DanRichmondAI
          </a>{' '}
          on X
        </p>
      </div>
    </Layout>
  )
}
