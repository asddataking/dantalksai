# Right Sidebar Setup Guide

This guide explains how to set up and use the new right sidebar component for dantalksai.com that combines Dan's Tools (Affiliate Vault) and AI Pulse (News Feed).

## Features

### 🚀 Dan's Tools (Affiliate Vault)
- Pulls from existing Supabase `tools` table
- Shows featured tools with badges (🔥 NEW, ⭐ FAVORITE, 🔥 TRENDING)
- Hover tooltips with "Why Dan likes this tool"
- "Try Now" buttons with affiliate links
- Responsive design for desktop and mobile

### 📰 AI Pulse (News Feed)
- Live AI updates from RSS feeds (OpenAI, Anthropic, HuggingFace, etc.)
- Auto-summarized content stored in Supabase
- Featured news items with special styling
- Source tags and categorization
- Hourly updates via cron job

## Database Setup

### 1. Run the AI News Migration

```bash
# Apply the new migration to create the ai_news table
npx supabase db push
```

This creates the `ai_news` table with the following structure:
- `id`: UUID primary key
- `title`: News title
- `summary`: Auto-generated summary
- `url`: Original article URL
- `source`: RSS source name
- `tags`: Array of relevant tags
- `is_featured`: Boolean for featured items
- `is_active`: Boolean for active items
- `published_at`: Publication timestamp
- `created_at`/`updated_at`: Timestamps

### 2. Sample Data

The migration includes sample AI news data to get you started. You can add more sources by modifying the `scripts/update-rss-feeds.js` file.

## RSS Feed Updates

### 1. Install Dependencies

```bash
npm install
```

### 2. Manual Update

```bash
# Run the RSS update script manually
node scripts/update-rss-feeds.js
```

### 3. Automated Updates (Cron)

Set up a cron job to run every hour:

```bash
# Edit crontab
crontab -e

# Add this line (adjust path as needed)
0 * * * * cd /path/to/dantalksai && node scripts/update-rss-feeds.js
```

### 4. Environment Variables

Ensure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # For RSS updates
```

## Component Usage

### 1. Import the Sidebar

```jsx
import RightSidebar from '../components/RightSidebar'

// Add to your layout
<RightSidebar />
```

### 2. Main Content Spacing

The sidebar automatically adds right margin on desktop:

```jsx
// Your main content wrapper should include:
<main className="min-h-screen bg-black text-white lg:pr-80">
  {/* Your content */}
</main>
```

## Customization

### 1. RSS Sources

Edit `scripts/update-rss-feeds.js` to add/remove RSS sources:

```javascript
const RSS_SOURCES = [
  {
    name: 'Your Source',
    url: 'https://yoursource.com/rss.xml',
    tags: ['Tag1', 'Tag2', 'AI']
  }
  // ... more sources
]
```

### 2. Styling

The sidebar uses Tailwind CSS with a cosmic/techy theme. Key classes:
- Background: `bg-gradient-to-b from-[#0B0B18] to-[#05050A]`
- Borders: `border-white/10`
- Accents: `bg-cyan-500/20`, `bg-fuchsia-500/20`

### 3. Badge Logic

Tool badges are automatically assigned based on:
- `is_new`: 🔥 NEW
- `rating >= 4.8`: ⭐ FAVORITE  
- `rating >= 4.5`: 🔥 TRENDING

## Mobile Experience

- **Desktop**: Fixed right sidebar (320px width)
- **Mobile**: Swipeable overlay with toggle button
- **Responsive**: Automatically adapts to screen size
- **Touch-friendly**: Optimized for mobile interactions

## Performance Features

- **Auto-hide**: Sidebar hides on scroll down, shows on scroll up
- **Lazy loading**: Data fetched only when needed
- **Optimized queries**: Efficient Supabase queries with proper indexing
- **Caching**: React hooks with proper dependency management

## Troubleshooting

### 1. Sidebar Not Showing

- Check browser console for errors
- Verify Supabase connection
- Ensure environment variables are set

### 2. RSS Feeds Not Updating

- Check cron job is running
- Verify RSS URLs are accessible
- Check Supabase permissions

### 3. Styling Issues

- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts
- Verify responsive breakpoints

## Future Enhancements

- [ ] Real-time updates via Supabase subscriptions
- [ ] User preferences for news sources
- [ ] Advanced filtering and search
- [ ] Integration with Notion (if env vars present)
- [ ] Analytics tracking for affiliate clicks
- [ ] A/B testing for featured content

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify Supabase table structure
3. Test RSS feed URLs manually
4. Check environment variable configuration

The sidebar is designed to be self-contained and won't break the main site if there are issues with the data sources.
