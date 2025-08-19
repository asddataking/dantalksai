import { useState, useEffect } from 'react'
import { getBlogPosts } from '../lib/blogHandler'

export default function TestSupabase() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const blogResult = await getBlogPosts()
      setResult(blogResult)
    } catch (error) {
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Supabase Connection Test</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black px-6 py-3 rounded-lg font-semibold mb-6"
        >
          {loading ? 'Testing...' : 'Test Supabase Connection'}
        </button>

        {result && (
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Test Result:</h2>
            <pre className="text-sm text-gray-300 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 text-gray-400">
          <h3 className="text-xl font-semibold mb-4">Environment Variables:</h3>
          <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (hidden)' : 'Not set'}</p>
        </div>
      </div>
    </div>
  )
}
