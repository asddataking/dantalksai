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
          {/* Google Analytics and other tracking scripts can be added here */}
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
