import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Dan Talks AI</title>
        <meta name="description" content="Premium AI system sales funnel" />
      </Head>
      {children}
    </>
  )
}
