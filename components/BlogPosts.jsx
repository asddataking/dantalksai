import Link from 'next/link'

export default function BlogPosts({ posts = [] }) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 px-4 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-purple-400">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.slug} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}
                  className="text-purple-400 hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
