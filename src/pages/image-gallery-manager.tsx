import { useState, useEffect } from "react";
import { PageNavigation } from "@/components/page-navigation";
import { ImageGalleryGrid } from "@/components/image-gallery-grid";
import {
  AddGalleryPageDialog,
  EditGalleryPageDialog,
  AddImageDialog,
  EditImageDialog,
  DeleteConfirmDialog,
} from "@/components/image-gallery-dialogs";
import type { GalleryPage, GalleryImage } from "@/types/image-gallery";

interface ImageGalleryManagerProps {
  initialPages?: GalleryPage[];
  initialImages?: GalleryImage[];
  onPageCreate?: (data: { name: string; description?: string }) => void;
  onPageUpdate?: (pageId: string, data: { name: string; description?: string }) => void;
  onPageDelete?: (pageId: string) => void;
  onImageCreate?: (pageId: string, data: { url: string; title: string; subtitle?: string }) => void;
  onImageUpdate?: (imageId: string, data: { url: string; title: string; subtitle?: string }) => void;
  onImageDelete?: (imageId: string) => void;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

export default function ImageGalleryManager({
  initialPages = [],
  initialImages = [],
  onPageCreate,
  onPageUpdate,
  onPageDelete,
  onImageCreate,
  onImageUpdate,
  onImageDelete,
  onImageClick,
}: ImageGalleryManagerProps) {
  const [pages, setPages] = useState<GalleryPage[]>(initialPages);
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [activePage, setActivePage] = useState<string>("");

  // Dialog states
  const [addPageDialog, setAddPageDialog] = useState(false);
  const [editPageDialog, setEditPageDialog] = useState<{ open: boolean; pageId?: string }>({
    open: false,
  });
  const [deletePageDialog, setDeletePageDialog] = useState<{ open: boolean; pageId?: string }>({
    open: false,
  });
  const [addImageDialog, setAddImageDialog] = useState(false);
  const [editImageDialog, setEditImageDialog] = useState<{
    open: boolean;
    imageId?: string;
  }>({ open: false });
  const [deleteImageDialog, setDeleteImageDialog] = useState<{
    open: boolean;
    imageId?: string;
  }>({ open: false });

  // Set initial active page
  useEffect(() => {
    if (!activePage && pages.length > 0) {
      setActivePage(pages[0].id);
    }
  }, [activePage, pages]);

  // Update internal state when props change
  useEffect(() => {
    setPages(initialPages);
  }, [initialPages]);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  // Get active page images
  const activePageImages = images.filter((img) => img.pageId === activePage);

  // Page handlers
  const handleAddPage = (data: { name: string; description?: string }) => {
    const newPage: GalleryPage = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      createdAt: Math.floor(Date.now() / 1000),
    };
    setPages([...pages, newPage]);
    setActivePage(newPage.id);
    onPageCreate?.(data);
  };

  const handleEditPage = (data: { name: string; description?: string }) => {
    if (!editPageDialog.pageId) return;
    setPages(
      pages.map((p) =>
        p.id === editPageDialog.pageId
          ? { ...p, name: data.name, description: data.description }
          : p
      )
    );
    onPageUpdate?.(editPageDialog.pageId, data);
  };

  const handleDeletePage = () => {
    if (!deletePageDialog.pageId) return;
    const pageId = deletePageDialog.pageId;

    // Remove page
    setPages(pages.filter((p) => p.id !== pageId));

    // Remove associated images
    setImages(images.filter((img) => img.pageId !== pageId));

    // Switch to another page if deleting active page
    if (activePage === pageId && pages.length > 1) {
      const newActivePage = pages.find((p) => p.id !== pageId);
      if (newActivePage) {
        setActivePage(newActivePage.id);
      }
    }

    onPageDelete?.(pageId);
  };

  // Image handlers
  const handleAddImage = (data: { url: string; title: string; subtitle?: string }) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      pageId: activePage,
      url: data.url,
      title: data.title,
      subtitle: data.subtitle,
      createdAt: Math.floor(Date.now() / 1000),
    };
    setImages([...images, newImage]);
    onImageCreate?.(activePage, data);
  };

  const handleEditImage = (data: { url: string; title: string; subtitle?: string }) => {
    if (!editImageDialog.imageId) return;
    setImages(
      images.map((img) =>
        img.id === editImageDialog.imageId
          ? { ...img, url: data.url, title: data.title, subtitle: data.subtitle }
          : img
      )
    );
    onImageUpdate?.(editImageDialog.imageId, data);
  };

  const handleDeleteImage = () => {
    if (!deleteImageDialog.imageId) return;
    setImages(images.filter((img) => img.id !== deleteImageDialog.imageId));
    onImageDelete?.(deleteImageDialog.imageId);
  };

  // Get data for edit dialogs
  const currentEditPage = editPageDialog.pageId
    ? pages.find((p) => p.id === editPageDialog.pageId)
    : undefined;

  const currentEditImage = editImageDialog.imageId
    ? images.find((img) => img.id === editImageDialog.imageId)
    : undefined;

  const currentDeletePage = deletePageDialog.pageId
    ? pages.find((p) => p.id === deletePageDialog.pageId)
    : undefined;

  const currentDeleteImage = deleteImageDialog.imageId
    ? images.find((img) => img.id === deleteImageDialog.imageId)
    : undefined;

  if (pages.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="py-24 text-center">
          <h2 className="text-lg font-semibold mb-2">No gallery pages yet</h2>
          <p className="text-muted-foreground mb-6">Create your first gallery page to get started</p>
          <button
            onClick={() => setAddPageDialog(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create Gallery Page
          </button>
        </div>

        <AddGalleryPageDialog open={addPageDialog} onOpenChange={setAddPageDialog} onSubmit={handleAddPage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageNavigation
        pages={pages}
        activePage={activePage}
        onPageChange={setActivePage}
        onAddPage={() => setAddPageDialog(true)}
        onEditPage={(pageId) => setEditPageDialog({ open: true, pageId })}
        onDeletePage={(pageId) => setDeletePageDialog({ open: true, pageId })}
      />

      <main>
        <ImageGalleryGrid
          images={activePageImages}
          onAddImage={() => setAddImageDialog(true)}
          onEditImage={(imageId) => setEditImageDialog({ open: true, imageId })}
          onDeleteImage={(imageId) => setDeleteImageDialog({ open: true, imageId })}
          onImageClick={onImageClick}
        />
      </main>

      {/* Page Dialogs */}
      <AddGalleryPageDialog open={addPageDialog} onOpenChange={setAddPageDialog} onSubmit={handleAddPage} />

      <EditGalleryPageDialog
        open={editPageDialog.open}
        onOpenChange={(open) => setEditPageDialog({ ...editPageDialog, open })}
        onSubmit={handleEditPage}
        initialData={currentEditPage}
      />

      <DeleteConfirmDialog
        open={deletePageDialog.open}
        onOpenChange={(open) => setDeletePageDialog({ open })}
        onConfirm={handleDeletePage}
        title="Delete Gallery Page?"
        description={`Are you sure you want to delete "${currentDeletePage?.name}"? This will also delete all images in this page. This action cannot be undone.`}
      />

      {/* Image Dialogs */}
      <AddImageDialog
        open={addImageDialog}
        onOpenChange={setAddImageDialog}
        onSubmit={handleAddImage}
      />

      <EditImageDialog
        open={editImageDialog.open}
        onOpenChange={(open) => setEditImageDialog({ ...editImageDialog, open })}
        onSubmit={handleEditImage}
        initialData={currentEditImage}
      />

      <DeleteConfirmDialog
        open={deleteImageDialog.open}
        onOpenChange={(open) => setDeleteImageDialog({ open })}
        onConfirm={handleDeleteImage}
        title="Delete Image?"
        description={`Are you sure you want to delete "${currentDeleteImage?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}
