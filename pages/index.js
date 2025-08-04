import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Form from '../components/Form'
import Footer from '../components/Footer'

export default function Home() {
  const router = useRouter()
  return (
    <Layout>
      <Hero />
      <Form onSuccess={() => router.push('/thank-you')} />
      <Footer />
    </Layout>
  )
}
