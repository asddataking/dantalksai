// Simple script to check your storage bucket structure
const projectId = 'prxioffyzbmygsliuabt'

async function checkStorageStructure() {
  console.log('Checking Supabase storage structure...')
  console.log('Project ID:', projectId)
  console.log('')
  
  // Test the paths that your code is trying to use
  const testPaths = [
    'Home/logo.png',
    'Home/Excavation1.jpg',
    'Home/dumpsterrental1.jpg',
    'industries/construction.jpg', // Example industry path
    'industries/excavation.jpg'   // Example industry path
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
  
  // Also test the edge function
  console.log('Testing Edge Function (should work now that JWT is disabled):')
  const edgeFunctionUrl = `https://${projectId}.supabase.co/functions/v1/serve-images/Home/logo.png`
  
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

checkStorageStructure()
