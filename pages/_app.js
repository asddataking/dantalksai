import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
