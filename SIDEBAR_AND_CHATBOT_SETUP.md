# Sidebar Widget & Rhea Chatbot Setup Guide

This guide covers the new features added to your Dan Talks AI site:

1. **Floating Sidebar Widget** - Transforms from full sidebar to compact widget when scrolling
2. **Rhea Chatbot** - AI assistant that captures leads and integrates with Notion
3. **Notion Integration** - Automatically adds leads to your Notion database

## 🎯 What's New

### Floating Sidebar Widget
- **Full sidebar** appears when scrolling up (shows tools + AI Pulse)
- **Compact widget** appears when scrolling past hero section (shows only AI Pulse)
- **Smooth transitions** between modes
- **Non-intrusive design** that enhances user experience

### Rhea Chatbot
- **Appears after 5 seconds** on page load
- **Guided conversation** to capture lead information
- **Auto-advances** through questions
- **Captures**: Business focus, weekly leads, AI agent type, budget, name, email
- **Integrates** with Supabase and Notion

## 🚀 Quick Setup

### 1. **Deploy Updated Components**

The components are already updated and ready to use. Just commit and push your changes:

```bash
git add .
git commit -m "Add floating sidebar widget and Rhea chatbot"
git push
```

### 2. **Set Environment Variables**

Add these to your `.env.local` file:

```bash
# Required
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional - Notion Integration
NOTION_API_KEY=your-notion-api-key
NOTION_DATABASE_ID=your-notion-database-id

# Optional - Email Notifications
SENDGRID_API_KEY=your-sendgrid-api-key
NOTIFICATION_EMAIL=your-email@example.com
```

## 🔧 Notion Integration Setup

### 1. **Create Notion Integration**

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Name it "Dan Talks AI Lead Capture"
4. Select your workspace
5. Copy the **Internal Integration Token**

### 2. **Create Notion Database**

Create a new database with these properties:

| Property Name | Type | Required |
|---------------|------|----------|
| Name | Title | ✅ Yes |
| Email | Email | ✅ Yes |
| Business Focus | Select | ❌ No |
| Weekly Leads | Select | ❌ No |
| AI Agent Type | Select | ❌ No |
| Monthly Budget | Select | ❌ No |
| Status | Select | ❌ No |
| Source | Select | ❌ No |
| Submission Date | Date | ❌ No |

### 3. **Set Select Options**

**Business Focus:**
- Lead Generation
- Customer Support
- Sales Automation

**Weekly Leads:**
- 0-10
- 11-50
- 50+

**AI Agent Type:**
- Chat Agent
- Voice Agent
- Email Agent

**Monthly Budget:**
- $100-500
- $500-1000
- $1000+

**Status:**
- New Lead
- Contacted
- Qualified
- Converted

**Source:**
- Rhea Chatbot
- Website Form
- Other

### 4. **Share Database with Integration**

1. Click **"Share"** on your database
2. Click **"Invite"**
3. Search for your integration name
4. Select it and click **"Invite"**

### 5. **Get Database ID**

1. Open your database
2. Copy the ID from the URL: `https://notion.so/workspace/[DATABASE_ID]?v=...`
3. Add to your `.env.local`:

```bash
NOTION_DATABASE_ID=your-database-id-here
```

## 📧 Email Notifications Setup (Optional)

### 1. **SendGrid Setup**

1. Create account at [SendGrid](https://sendgrid.com/)
2. Go to **Settings** → **API Keys**
3. Create new API key with **"Mail Send"** permissions
4. Copy the API key

### 2. **Verify Sender**

1. Go to **Settings** → **Sender Authentication**
2. Verify your domain or single sender
3. Add to your `.env.local`:

```bash
SENDGRID_API_KEY=your-sendgrid-api-key
NOTIFICATION_EMAIL=your-email@example.com
```

## 🎨 Customization Options

### Sidebar Widget

**Change Hero Section Height:**
```javascript
// In RightSidebar.jsx, line ~40
const heroHeight = 600 // Adjust this value
```

**Modify Widget Position:**
```javascript
// In RightSidebar.jsx, widgetStyles object
const widgetStyles = isWidgetMode ? {
  position: 'fixed',
  right: '20px',        // Adjust right position
  top: '50%',           // Adjust top position
  width: '320px',       // Adjust width
  // ... other styles
} : {}
```

### Rhea Chatbot

**Change Appearance Delay:**
```javascript
// In RheaChatbot.jsx, line ~25
const timer = setTimeout(() => {
  setIsVisible(true)
}, 5000) // Change from 5000ms to desired delay
```

**Modify Conversation Steps:**
```javascript
// In RheaChatbot.jsx, conversationSteps array
const conversationSteps = [
  // Add, remove, or modify steps
]
```

**Change Auto-advance Timing:**
```javascript
// In RheaChatbot.jsx, line ~35
const timer = setTimeout(() => {
  setCurrentStep(prev => prev + 1)
}, 2000) // Change from 2000ms to desired delay
```

## 📊 How It Works

### Sidebar Widget Flow
1. **Page loads** - No sidebar visible
2. **User scrolls up** - Full sidebar appears with tools + AI Pulse
3. **User scrolls past hero** - Sidebar transforms to compact widget
4. **Widget shows** only AI Pulse content (more focused)

### Rhea Chatbot Flow
1. **5 seconds after page load** - Rhea appears as floating button
2. **User clicks Rhea** - Chat interface opens
3. **Auto-advancing conversation** - Questions appear every 2 seconds
4. **User selects options** - Form data captured
5. **Final step** - Name and email input
6. **Submission** - Data sent to Supabase + Notion + Email notification

## 🔍 Testing

### Test Sidebar Widget
1. **Scroll up** - Should see full sidebar
2. **Scroll down past hero** - Should see compact widget
3. **Scroll back up** - Should return to full sidebar

### Test Rhea Chatbot
1. **Wait 5 seconds** - Rhea should appear
2. **Click Rhea** - Chat should open
3. **Watch auto-advance** - Questions should appear every 2 seconds
4. **Select options** - Should capture responses
5. **Submit form** - Should see success message

### Test Notion Integration
1. **Submit form through Rhea**
2. **Check Notion database** - New lead should appear
3. **Verify all fields** - Data should be properly formatted

## 🚨 Troubleshooting

### Sidebar Not Appearing
- Check if `isVisible` state is being set
- Verify scroll event listeners are working
- Check CSS z-index values

### Rhea Not Showing
- Check if `isVisible` state is being set
- Verify setTimeout is working
- Check console for errors

### Notion Integration Failing
- Verify `NOTION_API_KEY` is set correctly
- Check `NOTION_DATABASE_ID` is correct
- Ensure database is shared with integration
- Check API response in console

### Form Not Submitting
- Check `/api/submit-form` endpoint exists
- Verify environment variables are set
- Check browser console for errors
- Verify Supabase function is working

## 🎯 Expected Results

After setup, you should have:

✅ **Floating sidebar** that transforms based on scroll position
✅ **Rhea chatbot** that appears and captures leads
✅ **Notion integration** that adds leads to your database
✅ **Email notifications** for new leads (if configured)
✅ **Enhanced user experience** that's not intrusive

## 🔄 Next Steps

1. **Test all features** on your live site
2. **Monitor Notion database** for new leads
3. **Check email notifications** (if configured)
4. **Customize appearance** and timing as needed
5. **Track conversion rates** from Rhea interactions

Your site now has a sophisticated lead capture system that enhances user experience while building your email list! 🚀
