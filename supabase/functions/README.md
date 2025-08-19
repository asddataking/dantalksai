# Supabase Edge Functions

This directory contains Edge Functions that optimize your Dan Talks AI application by moving heavy operations to the edge.

## 🚀 Available Functions

### 1. `submit-form` - Optimized Form Submission
- **Purpose**: Handles form submissions with validation, rate limiting, and data enrichment
- **Features**:
  - Rate limiting (5 submissions per minute per IP)
  - Data validation and sanitization
  - Lead scoring algorithm
  - ROI estimation
  - Package recommendations
- **Endpoint**: `/functions/v1/submit-form`
- **Method**: POST

### 2. `get-blog-posts` - Cached Blog Retrieval
- **Purpose**: Optimized blog post retrieval with caching and search
- **Features**:
  - Intelligent caching (5-minute TTL)
  - Search and filtering
  - Pagination support
  - Data enrichment (read time, excerpts, etc.)
- **Endpoint**: `/functions/v1/get-blog-posts`
- **Method**: GET

### 3. `analytics` - Real-time Analytics
- **Purpose**: Provides comprehensive analytics and insights
- **Features**:
  - Form submission analytics
  - Blog performance metrics
  - System health monitoring
  - ROI calculations
  - Trend analysis
- **Endpoint**: `/functions/v1/analytics`
- **Method**: GET

## 🛠️ Deployment

### Prerequisites
1. Supabase CLI installed
2. Supabase project set up
3. Environment variables configured

### Deploy All Functions
```bash
supabase functions deploy
```

### Deploy Individual Function
```bash
supabase functions deploy submit-form
supabase functions deploy get-blog-posts
supabase functions deploy analytics
```

### Environment Variables
Set these in your Supabase dashboard:
```bash
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📱 Usage Examples

### Form Submission
```javascript
const response = await fetch('/functions/v1/submit-form', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    businessFocus: 'Real Estate',
    weeklyLeads: 15,
    aiAgent: 'yes',
    monthlyBudget: '$500-$2K'
  })
})

const result = await response.json()
// Returns: lead_score, estimated_roi, recommended_package
```

### Blog Posts with Search
```javascript
const response = await fetch('/functions/v1/get-blog-posts?search=AI&page=1&limit=10')
const result = await response.json()
// Returns: posts, pagination, meta information
```

### Analytics
```javascript
const response = await fetch('/functions/v1/analytics?period=month')
const result = await response.json()
// Returns: form_analytics, blog_analytics, system_metrics
```

## 🔧 Configuration

### Rate Limiting
- **Form submissions**: 5 per minute per IP
- **Cache TTL**: 5 minutes for blog posts
- **Analytics**: Real-time calculation

### Caching Strategy
- **Memory-based caching** for development
- **Redis recommended** for production
- **Automatic cache invalidation**

## 📊 Performance Benefits

### Before (Client-side)
- Form validation in browser
- Direct database queries
- No caching
- Heavy client processing

### After (Edge Functions)
- Server-side validation
- Optimized database queries
- Intelligent caching
- Edge processing
- Rate limiting protection

## 🚨 Security Features

- **Rate limiting** to prevent abuse
- **Input validation** and sanitization
- **CORS protection**
- **Service role authentication**
- **IP-based restrictions**

## 🔄 Migration Guide

### Update Form Handler
Replace your current form submission with:
```javascript
// Old way
import { submitFormResponse } from '../lib/formHandler'

// New way
const response = await fetch('/functions/v1/submit-form', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Update Blog Handler
Replace your current blog fetching with:
```javascript
// Old way
import { getBlogPosts } from '../lib/blogHandler'

// New way
const response = await fetch('/functions/v1/get-blog-posts')
const result = await response.json()
```

## 📈 Monitoring

### Edge Function Logs
```bash
supabase functions logs submit-form
supabase functions logs get-blog-posts
supabase functions logs analytics
```

### Performance Metrics
- Response times
- Cache hit rates
- Error rates
- Rate limit hits

## 🎯 Next Steps

1. **Deploy functions** to your Supabase project
2. **Update client code** to use Edge Function endpoints
3. **Monitor performance** and adjust caching strategies
4. **Add Redis** for production caching
5. **Implement real-time analytics** with WebSockets

## 🆘 Troubleshooting

### Common Issues
- **CORS errors**: Check function CORS headers
- **Rate limiting**: Implement exponential backoff
- **Cache misses**: Adjust TTL values
- **Performance**: Monitor function execution times

### Debug Mode
```bash
supabase functions serve --debug
```

## 📚 Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Runtime](https://deno.land/)
- [Edge Function Examples](https://github.com/supabase/supabase/tree/master/examples/edge-functions)
