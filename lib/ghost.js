import GhostContentAPI from '@tryghost/content-api'

let api = null

if (process.env.NEXT_PUBLIC_GHOST_URL && process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY) {
  api = new GhostContentAPI({
    url: process.env.NEXT_PUBLIC_GHOST_URL,
    key: process.env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
    version: 'v5.0',
  })
}

export async function getPosts(limit = 3) {
  if (!api) return []
  try {
    const posts = await api.posts.browse({ limit, fields: 'id,title,excerpt,url,feature_image' })
    return posts
  } catch (err) {
    console.error('Error fetching Ghost posts', err)
    return []
  }
}

export default api
