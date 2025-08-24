# Google Drive Video Setup Guide

## Step 1: Upload Videos to Google Drive

1. Upload your 2 videos to a Google Drive folder
2. Make sure the videos are in a format supported by browsers (MP4, WebM)

## Step 2: Get Google Drive File IDs

For each video:

1. **Right-click** on the video file in Google Drive
2. Select **"Get link"** or **"Share"**
3. Choose **"Anyone with the link can view"**
4. Copy the sharing URL - it will look like:
   ```
   https://drive.google.com/file/d/1ABC123xyz789/view?usp=sharing
   ```
5. Extract the **file ID** from the URL (the part between `/d/` and `/view`)
   - In the example above, the file ID is: `1ABC123xyz789`

## Step 3: Update Video Database

Edit the file `src/data/videos.ts` and replace the placeholder Google Drive IDs:

```typescript
export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'federalism-video',
    // ... other properties ...
    googleDriveId: 'YOUR_FEDERALISM_VIDEO_FILE_ID_HERE', // Replace this
  },
  {
    id: 'organic-chemistry-photosynthesis-video',
    // ... other properties ...
    googleDriveId: 'YOUR_CHEMISTRY_VIDEO_FILE_ID_HERE', // Replace this
  }
];
```

## Step 4: Test Video Matching

The system will automatically match user queries to videos based on:

### Federalism Video Topics:
- "federalism"
- "government"
- "constitution"
- "Nepal politics"
- "federal system"

### Organic Chemistry & Photosynthesis Video Topics:
- "organic chemistry"
- "photosynthesis"
- "plant biology"
- "chemical reactions"
- "sugauli treaty" (as mentioned in your requirements)

## Step 5: Video Formats & Optimization

### Recommended Video Specifications:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720 (HD) or 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9 (matches our 800px × 450px player)
- **Duration**: 2-3 minutes for optimal engagement
- **File Size**: Under 100MB for faster loading

### Google Drive Embedding Notes:
- Videos will be embedded using iframe
- Users can play, pause, and control volume
- Google Drive provides automatic transcoding for web playback
- Videos are served with Google's CDN for fast loading

## Step 6: Adding More Videos

To add more videos in the future:

1. Add a new entry to the `DEMO_VIDEOS` array in `src/data/videos.ts`
2. Include relevant keywords and topics for matching
3. Upload the video to Google Drive and get the file ID
4. Update the example queries in `EXAMPLE_QUERIES`

## Example User Queries That Will Work:

### For Federalism Video:
- "Explain federalism in Nepal"
- "How does the federal system work?"
- "What is federalism?"
- "Nepal government structure"

### For Chemistry/Photosynthesis Video:
- "Explain photosynthesis"
- "How does photosynthesis work?"
- "Organic chemistry basics"
- "What is organic chemistry?"
- "Sugauli treaty"

## Troubleshooting:

### If videos don't load:
1. Check that the Google Drive sharing permissions are set to "Anyone with the link"
2. Verify the file IDs are correct in `src/data/videos.ts`
3. Ensure the videos are in a supported format (MP4 recommended)

### If queries don't match:
1. Add more keywords to the `keywords` array for each video
2. Check the matching logic in `findMatchingVideo()` function
3. Test with different query variations

## Current Video Player Dimensions:
- **Width**: 800px max (responsive)
- **Height**: 450px
- **Aspect Ratio**: ~16:9 (optimal for your videos)
