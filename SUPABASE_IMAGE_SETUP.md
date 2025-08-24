# Supabase Image Storage Setup

## 🎯 **Goal**
Set up Supabase storage to serve all images for your site, eliminating 400 errors and providing better performance.

## 🚀 **Quick Setup**

### 1. **Create Storage Bucket**
In your Supabase dashboard:
- Go to **Storage** → **Buckets**
- Click **"New bucket"**
- Name: `images`
- Public: ✅ **Yes** (so images are publicly accessible)
- File size limit: `50MB`
- Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`

### 2. **Upload Your Images**
Upload your images to the `images` bucket:

**Option A: Supabase Dashboard**
- Go to **Storage** → **Buckets** → **images**
- Click **"Upload file"**
- Upload `dumpsterrental1.jpg` to `industries/dumpster-grid.jpg`

**Option B: Supabase CLI**
```bash
supabase storage upload images/industries/dumpster-grid.jpg public/dumpsterrental1.jpg
```

### 3. **Update Environment Variables**
Make sure your `.env.local` has:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🔧 **What I've Already Set Up**

✅ **Storage utility functions** (`lib/storage.js`)
✅ **Updated IndustryTile component** to use Supabase URLs
✅ **Updated industries registry** to use storage paths
✅ **Storage migration** (`supabase/migrations/20250105000004_setup_storage_bucket.sql`)

## 📁 **Image Structure**
```
Supabase Storage Bucket: images/
├── industries/
│   ├── dumpster-grid.jpg (your dumpsterrental1 image)
│   ├── driveway.jpg
│   ├── excavation.jpg
│   ├── landscaping.jpg
│   ├── painting.jpg
│   ├── trainer.jpg
│   ├── lawyer.jpg
│   └── garage.jpg
└── other-images/
    ├── logo.png
    ├── Rhea.png
    └── blog-images/
```

## 🎨 **How It Works Now**

1. **Homepage Industry Grid**: Uses Supabase storage URLs
2. **Dumpster Rental Page**: No background image (clean CSS gradients)
3. **All Images**: Served from Supabase CDN for better performance

## 🚨 **Current Issue**
The dumpster rental page hero is still showing an image when it shouldn't. This suggests there's some other code applying the image. 

**Next Steps:**
1. Set up Supabase storage bucket
2. Upload your images
3. Test if the hero image issue is resolved
4. If not, we'll need to debug further

## 🔍 **Debugging the Hero Image Issue**

If the image still shows on the dumpster rental page hero after setting up Supabase storage, the issue might be:
- Global CSS applying background images
- JavaScript dynamically setting images
- Some other component or middleware

Let me know what happens after you set up the storage bucket!
