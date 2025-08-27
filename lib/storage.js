import { supabase } from './supabase'

// Storage bucket name for images
export const STORAGE_BUCKET = 'images'

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
  
  // Check if supabase client is available
  if (!supabase) {
    console.error('Supabase client not available for image:', path)
    return null
  }
  
  // For Supabase storage paths
  try {
    const { data, error } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path)
    
    if (error) {
      console.error('Error getting public URL for:', path, error)
      return null
    }
    
    console.log('Generated URL for', path, ':', data?.publicUrl)
    return data?.publicUrl || null
  } catch (err) {
    console.error('Exception getting public URL for:', path, err)
    return null
  }
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
