// Types untuk Image Gallery System

export interface GalleryPage {
  id: string;
  name: string;
  description?: string;
  createdAt?: number;
  order?: number;
}

export interface GalleryImage {
  id: string;
  pageId: string;
  url: string;
  title: string;
  subtitle?: string;
  createdAt?: number;
  order?: number;
}

export interface GalleryPageWithImages extends GalleryPage {
  images: GalleryImage[];
}

// Insert schemas untuk form validation
export interface InsertGalleryPageData {
  name: string;
  description?: string;
}

export interface InsertGalleryImageData {
  pageId: string;
  url: string;
  title: string;
  subtitle?: string;
}

export interface UpdateGalleryPageData {
  name?: string;
  description?: string;
}

export interface UpdateGalleryImageData {
  url?: string;
  title?: string;
  subtitle?: string;
}
