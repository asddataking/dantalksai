export default function Footer() {
  return (
    <footer className="relative py-6 text-center text-slate-400">
      <a
        href="https://danrichmond.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        Built by Dan Richmond
      </a>
      <a
        href="https://x.com/DanRichmondAI"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className="fixed bottom-4 right-4 p-3 rounded-full bg-slate-800 hover:bg-slate-700 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M18.9 2H22l-9.2 10.6L22.8 22h-3.1l-8.1-9.5L3.4 22H0l9.6-11L0 2h3.2l7.7 9 8-9z" />
        </svg>
      </a>
    </footer>
  )
}
