import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log(`[${new Date().toISOString()}] Request received: ${req.method} ${req.url}`)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const imagePath = url.pathname.split('/').slice(3).join('/') // Remove /functions/serve-images/
    
    console.log(`Image path extracted: ${imagePath}`)
    
    if (!imagePath) {
      console.log('No image path provided, returning 400')
      return new Response('Image path is required', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Extract the project ID from the request URL
    // URL format: https://project-id.supabase.co/functions/v1/serve-images/image-path
    const hostname = url.hostname
    const projectId = hostname.split('.')[0] // Extract project ID from hostname
    
    console.log(`Hostname: ${hostname}, Project ID: ${projectId}`)
    
    if (!projectId || projectId === 'localhost') {
      console.log('Invalid project configuration')
      return new Response('Invalid project configuration', { 
        status: 500, 
        headers: corsHeaders 
      })
    }

    const bucketName = 'images'
    
    // Construct the Supabase storage URL using the project ID
    const imageUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/${imagePath}`

    console.log(`Fetching image from: ${imageUrl}`)

    // Fetch the image from Supabase storage with proper headers for public access
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
        'User-Agent': 'DanTalksAI-Image-Server/1.0'
      }
    })
    
    console.log(`Storage response status: ${response.status} ${response.statusText}`)
    
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

    console.log(`Serving image: ${imagePath}, Content-Type: ${contentType}, Size: ${imageData.byteLength} bytes`)

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
