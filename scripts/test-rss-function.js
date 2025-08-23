#!/usr/bin/env node

/**
 * Test script for the RSS update Edge Function
 * Run this to test if the function is working correctly
 */

const https = require('https')

// Configuration - replace with your actual values
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '') || 'your-project-id.supabase.co'
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'

if (!SERVICE_ROLE_KEY || SERVICE_ROLE_KEY === 'your-service-role-key') {
  console.error('❌ Please set SUPABASE_SERVICE_ROLE_KEY environment variable')
  console.error('You can find this in your Supabase dashboard under Settings > API')
  console.error('Run: export SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key"')
  process.exit(1)
}

const functionUrl = `https://${SUPABASE_URL}/functions/v1/update-rss-feeds`

console.log('🧪 Testing RSS Update Edge Function...')
console.log('URL:', functionUrl)
console.log('Supabase URL:', SUPABASE_URL)
console.log('')

// Make the request
const postData = JSON.stringify({})

const options = {
  hostname: SUPABASE_URL,
  port: 443,
  path: '/functions/v1/update-rss-feeds',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}

const req = https.request(options, (res) => {
  console.log(`📡 Response Status: ${res.statusCode}`)
  console.log(`📡 Response Headers:`, res.headers)
  
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data)
      console.log('✅ Response Body:', JSON.stringify(response, null, 2))
      
      if (res.statusCode === 200) {
        console.log('\n🎉 Function test successful!')
        console.log('Your RSS update function is working correctly.')
        
        if (response.success) {
          console.log('✅ RSS feeds were updated successfully')
        } else {
          console.log('⚠️ Function ran but may have had issues')
        }
      } else {
        console.log('\n❌ Function test failed with status:', res.statusCode)
      }
    } catch (error) {
      console.log('📄 Raw Response:', data)
      console.log('❌ Could not parse response as JSON')
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message)
})

req.write(postData)
req.end()

console.log('⏳ Sending request...')
console.log('')
