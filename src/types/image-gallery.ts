// Types untuk Image Gallery System

export interface GalleryPage {
  id: string;
  name: string;
  description?: string;
  createdAt?: number;
  order?: number;
}

export interface GalleryRow {
  id: string;
  pageId: string;
  title: string;
  description?: string;
  createdAt?: number;
  order?: number;
}

export interface GalleryImage {
  id: string;
  pageId: string;
  rowId?: string;
  url: string;
  title: string;
  subtitle?: string;
  createdAt?: number;
  order?: number;
}

export interface GalleryPageWithImages extends GalleryPage {
  images: GalleryImage[];
}

export interface GalleryRowWithImages extends GalleryRow {
  images: GalleryImage[];
}

// Insert schemas untuk form validation
export interface InsertGalleryPageData {
  name: string;
  description?: string;
}

export interface InsertGalleryRowData {
  pageId: string;
  title: string;
  description?: string;
}

export interface InsertGalleryImageData {
  pageId: string;
  rowId?: string;
  url: string;
  title: string;
  subtitle?: string;
}

export interface UpdateGalleryPageData {
  name?: string;
  description?: string;
}

export interface UpdateGalleryRowData {
  title?: string;
  description?: string;
}

export interface UpdateGalleryImageData {
  url?: string;
  title?: string;
  subtitle?: string;
}
