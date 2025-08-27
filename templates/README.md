# Industry Page Template

This template follows the styling and structure of the Dumpster AI page for consistent branding across all industry-specific landing pages.

## How to Use

1. **Copy the template**: Copy `industry-page-template.tsx` to `pages/your-industry-ai.tsx`
2. **Update the content**: Modify the `industryConfig` object with your industry-specific content
3. **Add your image**: Upload your industry image to Supabase storage in the `Home/` folder
4. **Update the image path**: Change `'Home/industry-image.jpg'` to your actual image path

## Template Structure

### Hero Section
- Background image with dark overlay
- Large headline (AI for [Industry Name])
- Subheadline describing the value proposition
- "See It In Action" CTA button

### Benefits Section
- Three benefit cards with SVG icons
- Phone icon (red) for "Never Miss a Call"
- Money bag icon (yellow) for "Quotes on Autopilot"
- Calendar icon (red) for "Book Jobs Faster"

### How It Works Section
- Three-step process explanation
- Uses emoji icons (🤖, ⚙️, 🚀)
- Dark background to contrast with benefits section

### FAQ Section
- Light gray background
- Expandable FAQ items
- Industry-specific questions and answers

### Footer
- Uses the standard Footer component
- Includes navigation links and social media

## Customization Points

### industryConfig Object
```typescript
const industryConfig = {
  industryName: 'Your Industry Name',
  headline: 'AI for Your Industry',
  subheadline: 'Your specific value proposition',
  benefits: [
    'Benefit 1 description',
    'Benefit 2 description', 
    'Benefit 3 description'
  ],
  howItWorks: [
    // Customize the three steps
  ],
  faqs: [
    // Add industry-specific FAQs
  ]
}
```

### Image Handling
- Uses `getImageUrl()` function for proper Supabase integration
- Supports both client-side (edge function) and server-side (direct Supabase) URLs
- Automatically handles caching and error handling

### Styling
- Consistent color scheme: `#0B1C2E` (dark blue), `#C42B2B` (red), `#F5F7FA` (light gray)
- Responsive design with Tailwind CSS
- Framer Motion animations for smooth interactions
- Inter font family for consistency

## Benefits of This Template

1. **Consistent Branding**: Maintains visual consistency across all industry pages
2. **Optimized Performance**: Edge function for image handling, proper caching
3. **SEO Friendly**: Proper meta tags, structured data, and semantic HTML
4. **Mobile Responsive**: Works perfectly on all device sizes
5. **Accessibility**: Proper alt tags, semantic structure, and keyboard navigation
6. **Easy Maintenance**: Centralized configuration makes updates simple

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1920x1080 or larger
- **Storage**: Upload to Supabase `images` bucket in `Home/` folder
- **Naming**: Use descriptive names like `landscaping-hero.jpg`

## Next Steps After Creation

1. **Test the page**: Ensure all images load correctly
2. **Update navigation**: Add your new page to the Footer component
3. **SEO optimization**: Update meta descriptions and titles
4. **Analytics**: Add tracking for your specific industry
5. **Content review**: Ensure all text is industry-specific and accurate
