import ImageGalleryManager from "./image-gallery-manager";
import type { GalleryPage, GalleryImage } from "@/types/image-gallery";

// Sample gallery pages
const samplePages: GalleryPage[] = [
  {
    id: "1",
    name: "Nature",
    description: "Beautiful nature photography",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "2",
    name: "Cities",
    description: "Urban landscapes and architecture",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "3",
    name: "Abstract",
    description: "Abstract art and designs",
    createdAt: Math.floor(Date.now() / 1000),
  },
];

// Sample images with Unsplash URLs
const sampleImages: GalleryImage[] = [
  // Nature gallery
  {
    id: "img1",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop",
    title: "Mountain Landscape",
    subtitle: "Snow-capped peaks at sunrise",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img2",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop",
    title: "Forest Path",
    subtitle: "Sunlight through the trees",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img3",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop",
    title: "Lake Reflection",
    subtitle: "Mirror-like water surface",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img4",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=800&fit=crop",
    title: "Mountain Ridge",
    subtitle: "Dramatic mountain scenery",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img5",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop",
    title: "Tropical Beach",
    subtitle: "Palm trees and ocean waves",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img6",
    pageId: "1",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop",
    title: "Misty Valley",
    subtitle: "Morning fog in the mountains",
    createdAt: Math.floor(Date.now() / 1000),
  },

  // Cities gallery
  {
    id: "img7",
    pageId: "2",
    url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop",
    title: "City Skyline",
    subtitle: "Modern urban architecture",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img8",
    pageId: "2",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop",
    title: "Night City",
    subtitle: "City lights at dusk",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img9",
    pageId: "2",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop",
    title: "Urban Street",
    subtitle: "Busy city intersection",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img10",
    pageId: "2",
    url: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&h=800&fit=crop",
    title: "Bridge View",
    subtitle: "Iconic city bridge",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img11",
    pageId: "2",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=800&fit=crop",
    title: "Skyscrapers",
    subtitle: "Tall buildings against blue sky",
    createdAt: Math.floor(Date.now() / 1000),
  },

  // Abstract gallery
  {
    id: "img12",
    pageId: "3",
    url: "https://images.unsplash.com/photo-1557672199-6af603923c4f?w=800&h=800&fit=crop",
    title: "Color Waves",
    subtitle: "Vibrant abstract patterns",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img13",
    pageId: "3",
    url: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&h=800&fit=crop",
    title: "Geometric Shapes",
    subtitle: "Modern abstract design",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img14",
    pageId: "3",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=800&fit=crop",
    title: "Light Trails",
    subtitle: "Long exposure abstract",
    createdAt: Math.floor(Date.now() / 1000),
  },
  {
    id: "img15",
    pageId: "3",
    url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=800&fit=crop",
    title: "Fluid Art",
    subtitle: "Colorful liquid patterns",
    createdAt: Math.floor(Date.now() / 1000),
  },
];

export default function ImageGalleryExample() {
  return (
    <ImageGalleryManager
      initialPages={samplePages}
      initialImages={sampleImages}
      onPageCreate={(data) => console.log("Page created:", data)}
      onPageUpdate={(pageId, data) => console.log("Page updated:", pageId, data)}
      onPageDelete={(pageId) => console.log("Page deleted:", pageId)}
      onImageCreate={(pageId, data) => console.log("Image created:", pageId, data)}
      onImageUpdate={(imageId, data) => console.log("Image updated:", imageId, data)}
      onImageDelete={(imageId) => console.log("Image deleted:", imageId)}
      onImageClick={(image, index) => console.log("Image clicked:", image.title, "at index", index)}
    />
  );
}
