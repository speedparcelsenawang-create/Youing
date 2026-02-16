# 🖼️ Image Gallery Manager - Quick Guide

## Sistem Baru: Pages → Images 

Image gallery system macam **horizontol-img** tapi lebih simple - 2 level sahaja!

---

## 🚀 Cara Tengok

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Buka Browser
Go to `http://localhost:5173` (atau port yang dev server assign)

### 3. Navigate ke Image Gallery
```
Sidebar → Plano (expand) ▼
  ├── Standard
  ├── Shell  
  ├── Page Content
  └── Image Gallery  ← KLIK SINI! 🖼️
```

---

## ✨ Apa Yang Nampak

### 📸 Sample Data:
- **3 Gallery Pages:** Nature, Cities, Abstract
- **15 Beautiful Images** dari Unsplash
- Grid layout responsive (2-5 columns)

### 🎨 UI Features:
✅ Tab navigation untuk pages  
✅ Grid display untuk images  
✅ Hover overlay dengan actions  
✅ Image preview dalam dialog  
✅ Theme toggle (Dark/Light)  
✅ Smooth animations  

---

## 🎮 Features untuk Test

### 📑 Pages (Top Tabs):
- **Switch pages:** Click tabs
- **Edit page:** Hover tab → Click ⋮ → Edit
- **Delete page:** Hover tab → Click ⋮ → Delete
- **Add page:** Click + button

### 🖼️ Images (Grid):
- **View image:** Click image atau hover → Click 👁️
- **Edit image:** Hover → Click ✏️ → Edit URL/Title/Subtitle
- **Delete image:** Hover → Click 🗑️ → Confirm
- **Add image:** Click "Add New Image" button

### ➕ Adding Images:
1. Click "Add New Image"
2. Paste image URL (Unsplash, Imgur, etc)
3. Enter title & subtitle
4. See **live preview** dalam dialog
5. Click "Add Image"

---

## 🌄 Sample Image URLs untuk Testing

```
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800
https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800
https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800
https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800
https://images.unsplash.com/photo-1557672199-6af603923c4f?w=800
```

---

## 📦 Yang Dah Dibuat

### Files Created:
```
✅ src/types/image-gallery.ts           - Types & interfaces
✅ src/components/image-gallery-grid.tsx - Image grid display
✅ src/components/image-gallery-dialogs.tsx - All CRUD dialogs
✅ src/pages/image-gallery-manager.tsx  - Main component
✅ src/pages/image-gallery-example.tsx  - Example with data
✅ src/App.tsx (updated)                - Added routing
```

### Structure:
```
Pages (Tab Navigation)
  └── Images (Grid Cards)
```

---

## 🎯 Comparison

| horizontol-img | Image Gallery Manager |
|----------------|---------------------|
| Pages → Rows → Images | **Pages → Images** |
| 3-level | **2-level** (simpler!) |
| Horizontal scroll | **Grid layout** |
| Complex | **Simple & clean** |

---

## 💡 Tips

### Image URLs:
- ✅ Unsplash: `https://images.unsplash.com/...`
- ✅ Imgur: `https://i.imgur.com/...`
- ✅ Any direct image URL
- ❌ Avoid non-image URLs

### Best Practices:
- Use square or similar aspect ratio images
- Use consistent image sizes (e.g., 800x800)
- Add descriptive titles & subtitles
- Organize by theme dalam different pages

---

## 🔧 Troubleshooting

**Images tak load:**
- Check image URL valid
- Try paste URL dalam browser first
- Use direct image links (ends with .jpg, .png, etc)

**Dialog tak appear:**
- Make sure Radix UI packages installed: `npm install`

**Can't add/edit:**
- Fill required fields (URL & Title)
- Check URL preview shows correctly

---

## 📝 Backend Integration Example

```tsx
import ImageGalleryManager from "@/pages/image-gallery-manager";

function MyGallery() {
  return (
    <ImageGalleryManager
      initialPages={pagesFromDB}
      initialImages={imagesFromDB}
      onPageCreate={async (data) => {
        await fetch("/api/gallery/pages", {
          method: "POST",
          body: JSON.stringify(data)
        });
      }}
      onImageCreate={async (pageId, data) => {
        await fetch("/api/gallery/images", {
          method: "POST",
          body: JSON.stringify({ ...data, pageId })
        });
      }}
      // ... other handlers
    />
  );
}
```

---

## 🎨 Customization

### Change Grid Columns:
Edit `image-gallery-grid.tsx`:
```tsx
// Current: 2-3-4-5 columns
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"

// Change to 3-4-6 columns:
className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
```

### Add Upload Feature:
Coming soon! Current version uses URL input.

---

**🎉 Enjoy your Image Gallery!**  
Simple, beautiful, functional. 📸✨
