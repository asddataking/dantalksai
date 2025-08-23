export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // For now, return curated trending topics
    // Later this will be fetched from Supabase
    const trending = [
      {
        id: '1',
        label: 'Landscaping',
        slug: 'landscaping',
        weight: 100,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        label: 'Restaurants',
        slug: 'restaurants',
        weight: 95,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        label: 'Real Estate',
        slug: 'real-estate',
        weight: 90,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        label: 'Content Creators',
        slug: 'content-creators',
        weight: 85,
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        label: 'E-commerce',
        slug: 'e-commerce',
        weight: 80,
        created_at: new Date().toISOString()
      },
      {
        id: '6',
        label: 'Service Business',
        slug: 'service-business',
        weight: 75,
        created_at: new Date().toISOString()
      }
    ]

    res.status(200).json({ trending })
  } catch (error) {
    console.error('Error fetching trending topics:', error)
    res.status(500).json({ error: 'Failed to fetch trending topics' })
  }
}
