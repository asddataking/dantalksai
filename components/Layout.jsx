import Head from 'next/head';
import { useMemo } from 'react';

const Layout = ({ children }) => {
  const organizationJsonLd = useMemo(() => ({
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
  }), []);

  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MJVT3C61J0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MJVT3C61J0');
            `
          }}
        />
        
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1937494170404510');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1937494170404510&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/logo.png" />
        
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
};

export default Layout;
