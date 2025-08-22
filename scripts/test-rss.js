#!/usr/bin/env node

/**
 * Test script for RSS functionality
 * Run this to verify RSS feeds are accessible and parsing works
 */

const Parser = require('rss-parser')
const parser = new Parser()

// Test a few RSS feeds
const TEST_FEEDS = [
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml'
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml'
  }
]

async function testRSSFeed(source) {
  try {
    console.log(`\n🔍 Testing ${source.name}...`)
    console.log(`   URL: ${source.url}`)
    
    const feed = await parser.parseURL(source.url)
    
    console.log(`   ✅ Success!`)
    console.log(`   📰 Feed title: ${feed.title}`)
    console.log(`   📊 Items found: ${feed.items.length}`)
    
    if (feed.items.length > 0) {
      const firstItem = feed.items[0]
      console.log(`   📝 Latest item: ${firstItem.title}`)
      console.log(`   🔗 URL: ${firstItem.link}`)
      console.log(`   📅 Published: ${firstItem.pubDate || 'No date'}`)
    }
    
    return true
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🧪 Testing RSS Feed Functionality')
  console.log('=====================================')
  
  let successCount = 0
  let totalCount = TEST_FEEDS.length
  
  for (const feed of TEST_FEEDS) {
    const success = await testRSSFeed(feed)
    if (success) successCount++
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n📊 Test Results')
  console.log('================')
  console.log(`✅ Successful: ${successCount}/${totalCount}`)
  console.log(`❌ Failed: ${totalCount - successCount}/${totalCount}`)
  
  if (successCount === totalCount) {
    console.log('\n🎉 All RSS feeds are working correctly!')
    console.log('   You can now run the main update script:')
    console.log('   node scripts/update-rss-feeds.js')
  } else {
    console.log('\n⚠️  Some RSS feeds failed. Check the URLs and try again.')
  }
}

// Run the test
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { testRSSFeed }
