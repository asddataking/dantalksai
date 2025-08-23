import { slugify, titleCase } from '../../../lib/utils/slug'
import { checkTopicExists, createPlaceholderTopic } from '../../../lib/data/aiPulse'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { query } = req.body

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' })
    }

    const slug = slugify(query)
    const topic = titleCase(slug.replace(/-/g, ' '))

    // Check if topic already exists
    const exists = await checkTopicExists(slug)
    
    if (!exists) {
      // Create placeholder topic
      await createPlaceholderTopic(slug, query)
    }

    const response = {
      slug,
      topic,
      isNew: !exists
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error processing search:', error)
    res.status(500).json({ error: 'Failed to process search' })
  }
}
