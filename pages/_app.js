import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Layout from '../components/Layout'
import { AuthProvider } from '../lib/authContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <DefaultSeo {...SEO} />
        <Head>
          <script id="vtag-ai-js" async src="https://r2.leadsy.ai/tag.js" data-pid="bvlXU7UBWdq7IayM" data-version="062024"></script>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
