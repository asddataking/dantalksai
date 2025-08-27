// Test script to verify the edge function is working
const testEdgeFunction = async () => {
  const projectId = 'prxioffyzbmygsliuabt'
  const testPaths = [
    'Home/logo.png',
    'Home/Excavation1.jpg',
    'Home/dumpsterrental1.jpg'
  ]

  console.log('Testing Supabase Edge Function...')
  console.log('Project ID:', projectId)
  console.log('')

  for (const path of testPaths) {
    const edgeFunctionUrl = `https://${projectId}.supabase.co/functions/v1/serve-images/${path}`
    const directStorageUrl = `https://${projectId}.supabase.co/storage/v1/object/public/images/${path}`
    
    console.log(`Testing: ${path}`)
    console.log(`Edge Function URL: ${edgeFunctionUrl}`)
    console.log(`Direct Storage URL: ${directStorageUrl}`)
    
    try {
      // Test edge function
      console.log('Testing Edge Function...')
      const edgeResponse = await fetch(edgeFunctionUrl)
      console.log(`Edge Function Status: ${edgeResponse.status} ${edgeResponse.statusText}`)
      
      if (edgeResponse.ok) {
        const contentType = edgeResponse.headers.get('content-type')
        const contentLength = edgeResponse.headers.get('content-length')
        console.log(`✅ Edge Function Success - Content-Type: ${contentType}, Size: ${contentLength}`)
      } else {
        console.log(`❌ Edge Function Failed`)
      }
      
      // Test direct storage
      console.log('Testing Direct Storage...')
      const storageResponse = await fetch(directStorageUrl)
      console.log(`Direct Storage Status: ${storageResponse.status} ${storageResponse.statusText}`)
      
      if (storageResponse.ok) {
        const contentType = storageResponse.headers.get('content-type')
        const contentLength = storageResponse.headers.get('content-length')
        console.log(`✅ Direct Storage Success - Content-Type: ${contentType}, Size: ${contentLength}`)
      } else {
        console.log(`❌ Direct Storage Failed`)
      }
      
    } catch (error) {
      console.log(`❌ Error testing ${path}:`, error.message)
    }
    
    console.log('---')
  }
}

// Run the test
testEdgeFunction().catch(console.error)
