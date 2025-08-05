import Head from 'next/head';

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dan Talks AI",
  url: "https://www.dantalks.ai/",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Michigan",
    addressRegion: "MI",
    addressCountry: "US"
  },
  areaServed: "United States"
};

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>AI Agency in Michigan serving the United States</title>
        <meta
          name="description"
          content="AI Agency in Michigan serving the United States"
        />
        <meta
          name="keywords"
          content="AI agency, Michigan, artificial intelligence, United States, AI services"
        />
        <link rel="canonical" href="https://www.dantalks.ai/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="AI Agency in Michigan serving the United States"
        />
        <meta
          property="og:description"
          content="AI Agency in Michigan serving the United States"
        />
        <meta property="og:url" content="https://www.dantalks.ai/" />
        <meta property="og:site_name" content="Dan Talks AI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="AI Agency in Michigan serving the United States"
        />
        <meta
          name="twitter:description"
          content="AI Agency in Michigan serving the United States"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>
      {children}
    </>
  );
}
