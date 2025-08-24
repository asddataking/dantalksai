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
  
  // For Supabase storage paths
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)
  
  return data.publicUrl
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
