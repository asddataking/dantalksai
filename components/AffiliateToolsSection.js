import { motion, AnimatePresence } from 'framer-motion'
import { useTools } from '../lib/hooks/useTools'
import { TOOLS_FIELDS } from '../lib/supabase'

export default function AffiliateToolsSection() {
  const {
    tools,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    pricing,
    setPricing,
    sortBy,
    setSortBy,
    onlyNew,
    setOnlyNew,
    categories,
    pricingOptions,
    sortOptions
  } = useTools()

  if (loading) {
    return (
      <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0B18] to-[#05050A] p-6 sm:p-8 mx-4 mb-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading tools...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0B18] to-[#05050A] p-6 sm:p-8 mx-4 mb-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error loading tools: {error}</p>
            <p className="text-gray-400">Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0B0B18] to-[#05050A] p-6 sm:p-8 mx-4 mb-8">
      {/* Cosmic background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(100,92,255,0.35),transparent_60%)]" />
        <div className="absolute -bottom-20 right-10 h-64 w-64 rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(0,199,255,0.35),transparent_60%)]" />
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.288 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.552-.552l1.562-1.562a4.006 4.006 0 001.9.03zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
            </svg>
            <span>Dan's Favorite AI Tools</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Build faster. Automate more. <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">Even while you sleep.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Hand-picked tools I actually use. Filter by category, pricing, or search by what you need.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2">
          <svg className="h-4 w-4 text-white/50" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.08-.041l-.08-.08z" clipRule="evenodd" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, e.g. captions, CRM, agents…"
            className="w-64 bg-transparent text-sm outline-none placeholder:text-white/40 text-white"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/20 text-white text-[11px]">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          {sortBy} • Sort
        </span>
        
        {/* Category Filter */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/10 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#0B0B18] text-white">
                {cat === "All" ? "Category: All" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing Filter */}
        <div className="relative">
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="appearance-none rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/10 focus:outline-none"
          >
            {pricingOptions.map((price) => (
              <option key={price} value={price} className="bg-[#0B0B18] text-white">
                {price === "All" ? "Pricing: All" : price}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/10 focus:outline-none"
          >
            {sortOptions.map((sort) => (
              <option key={sort} value={sort} className="bg-[#0B0B18] text-white">
                {sort}
              </option>
            ))}
          </select>
        </div>

        {/* New Only Toggle */}
        <button
          onClick={() => setOnlyNew(!onlyNew)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] ring-1 transition ${
            onlyNew ? "bg-fuchsia-500/10 text-fuchsia-200 ring-fuchsia-400/30" : "bg-black/40 text-white/70 ring-white/10"
          }`}
        >
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${onlyNew ? "bg-fuchsia-300" : "bg-white/40"}`} />
          New only
        </button>
      </div>

      {/* Grid */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {tools.map((tool, index) => (
            <motion.li
              key={tool[TOOLS_FIELDS.ID]}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, delay: index * 0.05 }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4">
                {/* Glow border on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" style={{
                  background:
                    "radial-gradient(60% 40% at 50% 0%, rgba(129, 140, 248, 0.35), transparent 70%), radial-gradient(50% 30% at 90% 20%, rgba(56, 189, 248, 0.35), transparent 70%)",
                }} />

                <div className="relative z-[1] flex items-start gap-3">
                  <img 
                    src={tool[TOOLS_FIELDS.LOGO_URL] || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} 
                    alt={tool[TOOLS_FIELDS.NAME]} 
                    className="h-9 w-9 rounded-xl bg-black/40 p-1 ring-1 ring-white/10" 
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{tool[TOOLS_FIELDS.NAME]}</h3>
                      {tool[TOOLS_FIELDS.IS_NEW] && (
                        <span className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-200 ring-1 ring-fuchsia-400/30">NEW</span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-white/70">{tool[TOOLS_FIELDS.DESCRIPTION]}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-[10px] ring-1 ring-white/10 text-white/70">
                        {tool[TOOLS_FIELDS.CATEGORY]}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ring-1 ${
                        tool[TOOLS_FIELDS.PRICING] === "Free" ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20" : 
                        tool[TOOLS_FIELDS.PRICING] === "Freemium" ? "bg-sky-500/10 text-sky-200 ring-sky-400/20" : 
                        "bg-indigo-500/10 text-indigo-200 ring-indigo-400/20"
                      }`}>
                        {tool[TOOLS_FIELDS.PRICING]}
                      </span>
                      <div className="ml-1 inline-flex items-center gap-0.5 text-amber-300">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`h-3.5 w-3.5 ${i < Math.floor(tool[TOOLS_FIELDS.RATING]) ? "fill-current" : "opacity-30"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-[10px] text-white/60">{tool[TOOLS_FIELDS.RATING].toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {tool[TOOLS_FIELDS.TAGS].map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60 ring-1 ring-white/10">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={tool[TOOLS_FIELDS.AFFILIATE_URL] || tool[TOOLS_FIELDS.URL]}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/20"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 004.11 6.9l.05.149a1 1 0 00.744.615l.066.013a1 1 0 00.823-.159l.012-.008a1 1 0 00.11-.1l1.58-1.636a1 1 0 00.758-.287 1 1 0 00.018-1.472zM9.194 13.194a1 1 0 00-1.414 0L6.879 14.51a1 1 0 001.415 1.415l1.414-1.414a1 1 0 000-1.415z" clipRule="evenodd" />
                      </svg>
                      Use this tool
                    </a>
                    <a
                      href={tool[TOOLS_FIELDS.URL]}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Site <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* tiny disclosure */}
                <p className="mt-3 text-[10px] text-white/40">Some links are affiliates — they help me make more content.</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Footer CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-white/70">
          Want my full stack? <span className="text-white">Join the newsletter</span> for setups, prompts, and deals.
        </div>
        <a href="#newsletter" className="group inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-200 transition hover:bg-indigo-500/20">
          <svg className="h-4 w-4 transition group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Get Dan's Drops
        </a>
      </div>
    </section>
  )
}
