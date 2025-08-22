# Automated RSS Feed Setup Guide

This guide will set up automated RSS feed updates that run every 10 minutes using Supabase Edge Functions.

## 🚀 Quick Setup

### 1. Deploy the Edge Function

```bash
# Navigate to your project directory
cd /path/to/dantalksai

# Deploy the RSS update function
npx supabase functions deploy update-rss-feeds
```

### 2. Set Environment Variables

In your Supabase dashboard, go to **Settings > API** and copy:
- **Project URL** (e.g., `https://abc123.supabase.co`)
- **Service Role Key** (the long key, not the anon key)

### 3. Test the Function

```bash
# Set your service role key as an environment variable
export SUPABASE_SERVICE_ROLE_KEY="your-actual-service-role-key"

# Test the function
node scripts/test-rss-function.js
```

## ⏰ Automated Updates

### Option A: GitHub Actions (Recommended)

1. **Add Repository Secrets** in your GitHub repo:
   - Go to **Settings > Secrets and variables > Actions**
   - Add `SUPABASE_URL` (just the project ID part, e.g., `abc123.supabase.co`)
   - Add `SUPABASE_SERVICE_ROLE_KEY` (your full service role key)

2. **The workflow will automatically run every 10 minutes**

3. **Manual trigger**: Go to **Actions > RSS Feed Update > Run workflow**

### Option B: External Cron Service

Use a service like [cron-job.org](https://cron-job.org) or [easycron.com](https://easycron.com):

- **URL**: `https://your-project-id.supabase.co/functions/v1/update-rss-feeds`
- **Method**: POST
- **Headers**: 
  - `Authorization: Bearer your-service-role-key`
  - `Content-Type: application/json`
- **Schedule**: Every 10 minutes (`*/10 * * * *`)

### Option C: Vercel Cron (if using Vercel)

Add this to your `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/rss-update",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

Then create `/pages/api/cron/rss-update.js`:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/update-rss-feeds`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const result = await response.json()
  res.status(200).json(result)
}
```

## 🔧 Configuration

### RSS Sources

The function automatically fetches from these sources:
- **OpenAI** - Latest AI research and announcements
- **Anthropic** - Claude updates and research
- **Hugging Face** - Open source AI models
- **Google DeepMind** - AI research breakthroughs
- **Microsoft AI** - Copilot and AI features
- **Meta AI** - Research and developments
- **Stability AI** - AI generation tools
- **NVIDIA** - AI infrastructure and training

### Customization

To add/remove sources, edit `supabase/functions/update-rss-feeds/index.ts`:

```typescript
const RSS_SOURCES = [
  {
    name: 'Your Source',
    url: 'https://yoursource.com/rss.xml',
    tags: ['Custom', 'AI', 'Your Tags']
  },
  // ... existing sources
]
```

## 📊 Monitoring

### Check Function Logs

In your Supabase dashboard:
1. Go to **Edge Functions**
2. Click on **update-rss-feeds**
3. View **Logs** tab

### Check Database

```sql
-- View recent news items
SELECT title, source, created_at 
FROM ai_news 
ORDER BY created_at DESC 
LIMIT 10;

-- Check for new items in the last hour
SELECT COUNT(*) as new_items 
FROM ai_news 
WHERE created_at > NOW() - INTERVAL '1 hour';
```

## 🚨 Troubleshooting

### Common Issues

1. **Function not deploying**
   - Check Supabase CLI is installed: `npx supabase --version`
   - Ensure you're logged in: `npx supabase login`

2. **Permission denied**
   - Verify you're using the **Service Role Key**, not the anon key
   - Check the key has the correct permissions

3. **RSS feeds not updating**
   - Check function logs for errors
   - Verify RSS URLs are accessible
   - Test the function manually first

4. **Rate limiting**
   - The function includes 1-second delays between sources
   - Some RSS feeds may have rate limits

### Testing

```bash
# Test individual RSS feeds
curl "https://openai.com/blog/rss.xml"

# Test the Edge Function
node scripts/test-rss-function.js

# Check function status
npx supabase functions list
```

## 🎯 Expected Results

After setup, you should see:
- ✅ New AI news articles appearing every 10 minutes
- ✅ Automatic cleanup of old articles (keeps last 100)
- ✅ Featured article rotation
- ✅ Real-time updates in your AI Pulse sidebar
- ✅ No more sample/demo data

## 🔄 Manual Updates

If you need to update immediately:

```bash
# Via GitHub Actions
# Go to Actions > RSS Feed Update > Run workflow

# Via curl
curl -X POST \
  "https://your-project-id.supabase.co/functions/v1/update-rss-feeds" \
  -H "Authorization: Bearer your-service-role-key" \
  -H "Content-Type: application/json"
```

## 📈 Performance

- **Function execution time**: ~30-60 seconds
- **Database operations**: Optimized with indexes
- **Memory usage**: Minimal (processes RSS feeds sequentially)
- **Cost**: Very low (Supabase Edge Functions are cost-effective)

Your AI Pulse section will now automatically stay updated with the latest AI industry news every 10 minutes! 🚀
