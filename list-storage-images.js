// Script to list images in your Supabase storage bucket
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://prxioffyzbmygsliuabt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeGlvZmZ5emJteWdzbGl1YWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NzE5NzAsImV4cCI6MjA1MTU0Nzk3MH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function listStorageImages() {
  console.log('Listing images in Supabase storage bucket...')
  
  try {
    // List all files in the images bucket
    const { data, error } = await supabase.storage
      .from('images')
      .list('', {
        limit: 100,
        offset: 0
      })
    
    if (error) {
      console.error('Error listing images:', error)
      return
    }
    
    console.log(`Found ${data.length} files in storage:`)
    console.log('')
    
    data.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name}`)
      console.log(`   - Size: ${file.metadata?.size || 'Unknown'} bytes`)
      console.log(`   - Type: ${file.metadata?.mimetype || 'Unknown'}`)
      console.log(`   - Updated: ${file.updated_at}`)
      console.log('')
    })
    
    // Check specific paths mentioned in your code
    const specificPaths = [
      'Home/logo.png',
      'Home/Excavation1.jpg', 
      'Home/dumpsterrental1.jpg'
    ]
    
    console.log('Checking specific paths mentioned in your code:')
    console.log('')
    
    for (const path of specificPaths) {
      try {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('images')
          .list(path.split('/').slice(0, -1).join('/') || '', {
            limit: 100,
            offset: 0
          })
        
        if (fileError) {
          console.log(`❌ ${path}: Error - ${fileError.message}`)
        } else {
          const fileName = path.split('/').pop()
          const exists = fileData.some(file => file.name === fileName)
          console.log(`${exists ? '✅' : '❌'} ${path}: ${exists ? 'EXISTS' : 'NOT FOUND'}`)
        }
      } catch (err) {
        console.log(`❌ ${path}: Exception - ${err.message}`)
      }
    }
    
  } catch (error) {
    console.error('Exception listing images:', error)
  }
}

listStorageImages()
