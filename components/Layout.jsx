import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Dan Talks AI</title>
        <meta name="description" content="Premium AI system sales funnel" />
      </Head>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 text-white font-sans">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-20 blur-3xl animate-[spin_15s_linear_infinite]"></div>
        <div className="relative z-10">{children}</div>
      </div>
    </>
  )
}
