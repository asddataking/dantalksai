import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  try {
    // Get the path from the URL segments
    const pathSegments = req.nextUrl.pathname.split('/').slice(3) // Remove /api/images/
    const imagePath = pathSegments.join('/')
    
    if (!imagePath) {
      return new NextResponse('Image path is required', { status: 400 })
    }

    // Construct the Supabase storage URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const bucketName = 'images'
    
    if (!supabaseUrl) {
      return new NextResponse('Supabase URL not configured', { status: 500 })
    }

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${imagePath}`

    // Fetch the image from Supabase
    const response = await fetch(imageUrl)
    
    if (!response.ok) {
      console.error(`Failed to fetch image from Supabase: ${response.status} ${response.statusText}`)
      return new NextResponse('Image not found', { status: 404 })
    }

    // Get the image data and headers
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const cacheControl = response.headers.get('cache-control') || 'public, max-age=31536000, immutable'

    // Return the image with proper headers
    return new NextResponse(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
