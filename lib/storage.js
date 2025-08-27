import { supabase } from './supabase'

// Storage bucket name for images
export const STORAGE_BUCKET = 'images'

// Debug function to check configuration
export function debugImageConfig() {
  const config = {
    isClient: typeof window !== 'undefined',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    storageBucket: STORAGE_BUCKET,
    hasSupabaseClient: !!supabase
  }
  
  console.log('Image configuration:', config)
  return config
}

// Get public URL for an image
export function getImageUrl(path) {
  if (!path) return null
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) {
    return path
  }
  
  // If it's a local path, return as is (for now)
  if (path.startsWith('/')) {
    return path
  }
  
  // Get Supabase URL from environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  // Use Supabase Edge Function for better error handling and caching
  if (typeof window !== 'undefined' && supabaseUrl) {
    // Client-side: use Supabase Edge Function
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/serve-images/${path}`
    console.log('Using edge function for image:', path, '→', edgeFunctionUrl)
    return edgeFunctionUrl
  } else if (supabaseUrl) {
    // Server-side or fallback: use direct Supabase storage URL
    const directUrl = `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`
    console.log('Using direct storage URL for image:', path, '→', directUrl)
    return directUrl
  }
  
  // Fallback: check if supabase client is available
  if (supabase) {
    try {
      const { data, error } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path)
      
      if (error) {
        console.error('Error getting public URL for:', path, error)
        return null
      }
      
      const fallbackUrl = data?.publicUrl || null
      console.log('Using fallback URL for image:', path, '→', fallbackUrl)
      return fallbackUrl
    } catch (err) {
      console.error('Exception getting public URL for:', path, err)
      return null
    }
  }
  
  console.error('No image URL method available for:', path)
  return null
}

// Upload an image to Supabase storage
export async function uploadImage(file, path) {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    return getImageUrl(data.path)
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

// Delete an image from Supabase storage
export async function deleteImage(path) {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path])
    
    if (error) throw error
    
    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}

// List all images in a folder
export async function listImages(folder = '') {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(folder)
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error listing images:', error)
    throw error
  }
}
