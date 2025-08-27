export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Image API test endpoint working',
    timestamp: new Date().toISOString(),
    env: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      bucketName: 'images'
    }
  })
}
