import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-slate-200">
        <Link href="/">
          <span className="font-bold text-white">Dan Talks AI</span>
        </Link>
        <div className="space-x-6">
          <a href="#deals" className="hover:text-white">Deals</a>
          <a href="#articles" className="hover:text-white">Articles</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  )
}
