export default function BlogPosts({ posts = [] }) {
  if (!posts.length) return null
  return (
    <section id="articles" className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Latest Articles</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.id} className="p-6 rounded-xl bg-slate-900/60 border border-slate-700">
            {post.feature_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.feature_image}
                alt={post.title}
                className="mb-4 rounded-md object-cover w-full h-48"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            {post.excerpt && <p className="mb-4 text-slate-300">{post.excerpt}</p>}
            <a
              href={post.url}
              className="text-indigo-400 hover:text-indigo-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
