import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0B1C2E] border-t border-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-[#F5F7FA] mb-4">
              Dan Talks AI
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built in America for hardworking businesses.
            </p>
          </div>
          
          {/* Links Column */}
          <div>
            <h4 className="text-[#F5F7FA] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">Home</Link></li>
              <li><Link href="#how-we-work" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">How We Work</Link></li>
              <li><Link href="#industries" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">Industries</Link></li>
              <li><Link href="/tools" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">Tools</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h4 className="text-[#F5F7FA] font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:dan@dantalksai.com" className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm">
                  dan@dantalksai.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                Michigan, USA
              </li>
            </ul>
          </div>
          
          {/* Social Column */}
          <div>
            <h4 className="text-[#F5F7FA] font-semibold mb-4">Follow</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://youtube.com/@dantalksai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm flex items-center gap-2"
                >
                  <span>📺</span> YouTube
                </a>
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/dantalksai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm flex items-center gap-2"
                >
                  <span>📘</span> Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/dantalksai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C42B2B] transition-colors text-sm flex items-center gap-2"
                >
                  <span>🐦</span> X/Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Dan Talks AI. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2 md:mt-0">
              Built in America 🇺🇸
            </p>
          </div>
        </div>
      </div>
      
      {/* LocalBusiness Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Dan Talks AI",
            "url": "https://dantalksai.com",
            "email": "dan@dantalksai.com",
            "areaServed": "US",
            "founder": "Dan Richmond",
            "sameAs": [
              "https://youtube.com/@dantalksai",
              "https://www.facebook.com/dantalksai/",
              "https://twitter.com/dantalksai"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Michigan",
              "addressCountry": "US"
            }
          })
        }}
      />
    </footer>
  )
}
