# Image Gallery Row-Based Layout

Sistem image gallery telah dikemaskini kepada row-based layout dengan ciri-ciri berikut:

## Struktur Baru

### Types
- **GalleryRow**: Setiap row mempunyai title dan description (optional)
- **GalleryImage**: Setiap image kini belongs to a row (rowId)

```typescript
interface GalleryRow {
  id: string;
  pageId: string;
  title: string;
  description?: string;
  order?: number;
}

interface GalleryRowWithImages extends GalleryRow {
  images: GalleryImage[];
}
```

## Ciri-ciri Utama

### 1. Row Management
- **Add New Row**: Button di bahagian bawah untuk tambah row baru
- **Row Header**: Setiap row ada title dan description (optional)
- **Row Menu**: Dropdown menu dengan options:
  - Edit Row (Edit title/description)
  - Move Up/Down (Reorder rows)
  - Delete Row (Delete row dan semua images)

### 2. Horizontal Scrolling Images
- Images dalam setiap row scroll secara horizontal
- Navigation arrows (prev/next) muncul on hover di kiri dan kanan
- Smooth scrolling untuk navigate images

### 3. Add Image Card
- Card terakhir dalam setiap row adalah "Add Image" button
- Border putus-putus (dashed border)
- Click untuk add image baru ke row tersebut

### 4. Image Actions
- **Hover**: Edit dan Delete buttons muncul on hover
- **Click**: Open lightbox/fullscreen view (optional)
- **Edit**: Update image URL, title, subtitle
- **Delete**: Remove image dari row

## Components

### ImageGalleryRows
Component utama untuk display rows dengan horizontal scrolling images.

```tsx
<ImageGalleryRows
  rows={rowsWithImages}
  onAddRow={() => {}}
  onEditRow={(rowId) => {}}
  onDeleteRow={(rowId) => {}}
  onReorderRow={(rowId, direction) => {}}
  onAddImageToRow={(rowId) => {}}
  onEditImage={(imageId) => {}}
  onDeleteImage={(imageId) => {}}
  onImageClick={(rowId, imageIndex) => {}}
/>
```

### ImageGalleryWithRows
Page component yang integrate semua functionality dengan dialog management.

## Dialogs

### Row Dialogs
- `AddRowDialog`: Dialog untuk create row baru
- `EditRowDialog`: Dialog untuk edit row
- `DeleteConfirmDialog`: Confirmation untuk delete row

### Image Dialogs
- `AddImageDialog`: Add image ke row
- `EditImageDialog`: Edit image details
- `DeleteConfirmDialog`: Confirmation untuk delete image

## Penggunaan

Lihat contoh di `src/pages/image-gallery-with-rows.tsx` dan demo data di `src/App.tsx`.

### Demo Data Structure
```tsx
const demoPages = [
  { id: "1", name: "Travel Photos", description: "My travel memories" }
];

const demoRows = [
  { id: "r1", pageId: "1", title: "Bali Trip 2024", description: "Amazing beaches", order: 0 }
];

const demoImages = [
  { id: "i1", pageId: "1", rowId: "r1", url: "...", title: "Beach", order: 0 }
];
```

## Styling Features

- **Responsive**: Works on mobile and desktop
- **Smooth animations**: Hover effects, scroll transitions
- **Theme-aware**: Automatically adapts to light/dark theme
- **Accessibility**: Keyboard navigation supported

## Navigation Controls

- **Arrow buttons**: Muncul on hover untuk scroll left/right
- **Scroll wheel**: Support horizontal scroll dengan mouse wheel
- **Touch**: Swipe gesture pada mobile devices
