import { supabase, TABLES, YOUTUBE_CONFIG_FIELDS } from './supabase'

export const getYouTubeConfig = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.YOUTUBE_CONFIG)
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching YouTube config:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to fetch YouTube config:', error)
    return { success: false, error: error.message }
  }
}

export const updateYouTubeConfig = async (apiKey, channelId) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.YOUTUBE_CONFIG)
      .upsert([
        {
          [YOUTUBE_CONFIG_FIELDS.API_KEY]: apiKey,
          [YOUTUBE_CONFIG_FIELDS.CHANNEL_ID]: channelId,
          [YOUTUBE_CONFIG_FIELDS.UPDATED_AT]: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error updating YouTube config:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Failed to update YouTube config:', error)
    return { success: false, error: error.message }
  }
}

export const getLatestYouTubeVideo = async () => {
  try {
    // Use environment variables for YouTube API configuration
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID

    if (!apiKey || !channelId) {
      return { success: false, error: 'YouTube API configuration not found' }
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      return { success: true, video: data.items[0] }
    } else {
      return { success: false, error: 'No videos found' }
    }
  } catch (error) {
    console.error('Failed to fetch latest YouTube video:', error)
    return { success: false, error: error.message }
  }
} 