// Test script to verify the corrected image paths
const projectId = 'prxioffyzbmygsliuabt'

async function testCorrectedPaths() {
  console.log('Testing corrected image paths...')
  console.log('Project ID:', projectId)
  console.log('')
  
  // Test the corrected paths
  const testPaths = [
    'Home/logo.png',                    // Should work
    'industries/Excavation1.jpg',       // Should work (corrected)
    'dumpsterrental1.jpg'               // Should work (corrected)
  ]
  
  for (const path of testPaths) {
    const url = `https://${projectId}.supabase.co/storage/v1/object/public/images/${path}`
    
    try {
      const response = await fetch(url)
      console.log(`${response.ok ? '✅' : '❌'} ${path}: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        const contentLength = response.headers.get('content-length')
        console.log(`   Content-Type: ${contentType}, Size: ${contentLength} bytes`)
      }
    } catch (error) {
      console.log(`❌ ${path}: Error - ${error.message}`)
    }
    console.log('')
  }
  
  // Test the edge function with corrected paths
  console.log('Testing Edge Function with corrected paths:')
  const edgeFunctionUrl = `https://${projectId}.supabase.co/functions/v1/serve-images/industries/Excavation1.jpg`
  
  try {
    const response = await fetch(edgeFunctionUrl)
    console.log(`Edge Function Status: ${response.status} ${response.statusText}`)
    
    if (response.ok) {
      console.log('✅ Edge Function is working! JWT verification is disabled.')
    } else {
      console.log('❌ Edge Function still has issues.')
    }
  } catch (error) {
    console.log(`❌ Edge Function Error: ${error.message}`)
  }
}

testCorrectedPaths()
