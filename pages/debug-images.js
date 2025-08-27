import { useState, useEffect } from 'react'
import { getImageUrl, debugImageConfig } from '../lib/storage'

export default function DebugImages() {
  const [config, setConfig] = useState(null)
  const [testResults, setTestResults] = useState([])

  useEffect(() => {
    // Debug configuration
    const imageConfig = debugImageConfig()
    setConfig(imageConfig)
    
    // Test image URLs
    const testPaths = [
      'Home/logo.png',
      'Home/Excavation1.jpg',
      'Home/dumpsterrental1.jpg'
    ]
    
    const results = testPaths.map(path => ({
      path,
      url: getImageUrl(path),
      timestamp: new Date().toISOString()
    }))
    
    setTestResults(results)
  }, [])

  const testEdgeFunction = async (path) => {
    const url = getImageUrl(path)
    if (!url) return
    
    try {
      const response = await fetch(url)
      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      }
    } catch (error) {
      return { error: error.message }
    }
  }

  const [testResponse, setTestResponse] = useState(null)

  const runTest = async () => {
    const response = await testEdgeFunction('Home/logo.png')
    setTestResponse(response)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Image Debug Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <pre className="text-sm bg-white p-2 rounded">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
        
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          {testResults.map((result, index) => (
            <div key={index} className="mb-2 p-2 bg-white rounded">
              <div><strong>Path:</strong> {result.path}</div>
              <div><strong>URL:</strong> {result.url}</div>
              <div><strong>Time:</strong> {result.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Test Edge Function</h2>
        <button 
          onClick={runTest}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Edge Function Call
        </button>
        
        {testResponse && (
          <div className="mt-4 p-2 bg-white rounded">
            <h3 className="font-semibold">Response:</h3>
            <pre className="text-sm">
              {JSON.stringify(testResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
            <div className="text-sm bg-white p-2 rounded mt-1">
              {process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}
            </div>
          </div>
          <div>
            <strong>NODE_ENV:</strong>
            <div className="text-sm bg-white p-2 rounded mt-1">
              {process.env.NODE_ENV}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
