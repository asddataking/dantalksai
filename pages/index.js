import { useState } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Form from '../components/Form'
import Success from '../components/Success'

export default function Home() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <Layout>
      {submitted ? (
        <Success onReset={() => setSubmitted(false)} />
      ) : (
        <>
          <Hero />
          <section className="py-16 px-4 bg-gradient-to-b from-black to-slate-900">
            <Form onSuccess={() => setSubmitted(true)} />
          </section>
        </>
      )}
    </Layout>
  )
}
