import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const imagePath = url.pathname.split('/').slice(3).join('/') // Remove /functions/serve-images/
    
    if (!imagePath) {
      return new Response('Image path is required', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Extract the project ID from the request URL
    // URL format: https://project-id.supabase.co/functions/v1/serve-images/image-path
    const hostname = url.hostname
    const projectId = hostname.split('.')[0] // Extract project ID from hostname
    
    if (!projectId || projectId === 'localhost') {
      return new Response('Invalid project configuration', { 
        status: 500, 
        headers: corsHeaders 
      })
    }

    const bucketName = 'images'
    
    // Construct the Supabase storage URL using the project ID
    const imageUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/${imagePath}`

    console.log(`Fetching image from: ${imageUrl}`)

    // Fetch the image from Supabase storage
    const response = await fetch(imageUrl)
    
    if (!response.ok) {
      console.error(`Failed to fetch image from Supabase: ${response.status} ${response.statusText}`)
      return new Response('Image not found', { 
        status: 404, 
        headers: corsHeaders 
      })
    }

    // Get the image data and headers
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const cacheControl = response.headers.get('cache-control') || 'public, max-age=31536000, immutable'

    // Return the image with proper headers
    return new Response(imageData, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new Response('Internal Server Error', { 
      status: 500, 
      headers: corsHeaders 
    })
  }
})
