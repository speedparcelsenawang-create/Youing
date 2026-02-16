import { useState, useEffect } from "react";
import { PageNavigation } from "@/components/page-navigation";
import { ImageGalleryRows } from "@/components/image-gallery-rows";
import {
  AddGalleryPageDialog,
  EditGalleryPageDialog,
  AddRowDialog,
  EditRowDialog,
  AddImageDialog,
  EditImageDialog,
  DeleteConfirmDialog,
} from "@/components/image-gallery-dialogs";
import type { GalleryPage, GalleryRow, GalleryImage, GalleryRowWithImages } from "@/types/image-gallery";

interface ImageGalleryWithRowsProps {
  initialPages?: GalleryPage[];
  initialRows?: GalleryRow[];
  initialImages?: GalleryImage[];
  onPageCreate?: (data: { name: string; description?: string }) => void;
  onPageUpdate?: (pageId: string, data: { name: string; description?: string }) => void;
  onPageDelete?: (pageId: string) => void;
  onRowCreate?: (pageId: string, data: { title: string; description?: string }) => void;
  onRowUpdate?: (rowId: string, data: { title: string; description?: string }) => void;
  onRowDelete?: (rowId: string) => void;
  onRowReorder?: (rowId: string, direction: 'up' | 'down') => void;
  onImageCreate?: (rowId: string, data: { url: string; title: string; subtitle?: string }) => void;
  onImageUpdate?: (imageId: string, data: { url: string; title: string; subtitle?: string }) => void;
  onImageDelete?: (imageId: string) => void;
  onImageClick?: (rowId: string, imageIndex: number) => void;
}

export default function ImageGalleryWithRows({
  initialPages = [],
  initialRows = [],
  initialImages = [],
  onPageCreate,
  onPageUpdate,
  onPageDelete,
  onRowCreate,
  onRowUpdate,
  onRowDelete,
  onRowReorder,
  onImageCreate,
  onImageUpdate,
  onImageDelete,
  onImageClick,
}: ImageGalleryWithRowsProps) {
  const [pages, setPages] = useState<GalleryPage[]>(initialPages);
  const [rows, setRows] = useState<GalleryRow[]>(initialRows);
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
  
  const [addRowDialog, setAddRowDialog] = useState(false);
  const [editRowDialog, setEditRowDialog] = useState<{ open: boolean; rowId?: string }>({
    open: false,
  });
  const [deleteRowDialog, setDeleteRowDialog] = useState<{ open: boolean; rowId?: string }>({
    open: false,
  });

  const [addImageDialog, setAddImageDialog] = useState<{ open: boolean; rowId?: string }>({
    open: false,
  });
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
    setRows(initialRows);
  }, [initialRows]);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  // Get active page rows with images
  const activePageRowsWithImages: GalleryRowWithImages[] = rows
    .filter((row) => row.pageId === activePage)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((row) => ({
      ...row,
      images: images
        .filter((img) => img.rowId === row.id)
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    }));

  // Page handlers
  const handleAddPage = (data: { name: string; description?: string }) => {
    const newPage: GalleryPage = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      createdAt: Date.now(),
      order: pages.length,
    };
    setPages([...pages, newPage]);
    setActivePage(newPage.id);
    onPageCreate?.(data);
  };

  const handleUpdatePage = (data: { name: string; description?: string }) => {
    if (!editPageDialog.pageId) return;
    setPages(
      pages.map((page) =>
        page.id === editPageDialog.pageId
          ? { ...page, name: data.name, description: data.description }
          : page
      )
    );
    onPageUpdate?.(editPageDialog.pageId, data);
  };

  const handleDeletePage = () => {
    if (!deletePageDialog.pageId) return;
    const pageToDelete = deletePageDialog.pageId;
    
    // Delete all rows and images in this page
    const rowsToDelete = rows.filter((r) => r.pageId === pageToDelete).map((r) => r.id);
    setRows(rows.filter((r) => r.pageId !== pageToDelete));
    setImages(images.filter((img) => !rowsToDelete.includes(img.rowId || "")));
    
    setPages(pages.filter((p) => p.id !== pageToDelete));
    
    if (activePage === pageToDelete && pages.length > 1) {
      const remainingPages = pages.filter((p) => p.id !== pageToDelete);
      setActivePage(remainingPages[0]?.id || "");
    }
    
    onPageDelete?.(pageToDelete);
  };

  // Row handlers
  const handleAddRow = (data: { title: string; description?: string }) => {
    const newRow: GalleryRow = {
      id: Date.now().toString(),
      pageId: activePage,
      title: data.title,
      description: data.description,
      createdAt: Date.now(),
      order: activePageRowsWithImages.length,
    };
    setRows([...rows, newRow]);
    onRowCreate?.(activePage, data);
  };

  const handleUpdateRow = (data: { title: string; description?: string }) => {
    if (!editRowDialog.rowId) return;
    setRows(
      rows.map((row) =>
        row.id === editRowDialog.rowId
          ? { ...row, title: data.title, description: data.description }
          : row
      )
    );
    onRowUpdate?.(editRowDialog.rowId, data);
  };

  const handleDeleteRow = () => {
    if (!deleteRowDialog.rowId) return;
    const rowToDelete = deleteRowDialog.rowId;
    
    // Delete all images in this row
    setImages(images.filter((img) => img.rowId !== rowToDelete));
    setRows(rows.filter((r) => r.id !== rowToDelete));
    
    onRowDelete?.(rowToDelete);
  };

  const handleReorderRow = (rowId: string, direction: 'up' | 'down') => {
    const currentIndex = activePageRowsWithImages.findIndex((r) => r.id === rowId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= activePageRowsWithImages.length) return;

    const updatedRows = [...rows];
    const currentRow = updatedRows.find((r) => r.id === rowId);
    const swapRow = updatedRows.find((r) => r.id === activePageRowsWithImages[newIndex].id);

    if (currentRow && swapRow) {
      const tempOrder = currentRow.order;
      currentRow.order = swapRow.order;
      swapRow.order = tempOrder;
    }

    setRows(updatedRows);
    onRowReorder?.(rowId, direction);
  };

  // Image handlers
  const handleAddImage = (data: { url: string; title: string; subtitle?: string }) => {
    if (!addImageDialog.rowId) return;
    
    const rowImages = images.filter((img) => img.rowId === addImageDialog.rowId);
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      pageId: activePage,
      rowId: addImageDialog.rowId,
      url: data.url,
      title: data.title,
      subtitle: data.subtitle,
      createdAt: Date.now(),
      order: rowImages.length,
    };
    setImages([...images, newImage]);
    onImageCreate?.(addImageDialog.rowId, data);
  };

  const handleUpdateImage = (data: { url: string; title: string; subtitle?: string }) => {
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

      <ImageGalleryRows
        rows={activePageRowsWithImages}
        onAddRow={() => setAddRowDialog(true)}
        onEditRow={(rowId) => setEditRowDialog({ open: true, rowId })}
        onDeleteRow={(rowId) => setDeleteRowDialog({ open: true, rowId })}
        onReorderRow={handleReorderRow}
        onAddImageToRow={(rowId) => setAddImageDialog({ open: true, rowId })}
        onEditImage={(imageId) => setEditImageDialog({ open: true, imageId })}
        onDeleteImage={(imageId) => setDeleteImageDialog({ open: true, imageId })}
        onImageClick={onImageClick}
      />

      {/* Page Dialogs */}
      <AddGalleryPageDialog
        open={addPageDialog}
        onOpenChange={setAddPageDialog}
        onSubmit={handleAddPage}
      />

      <EditGalleryPageDialog
        open={editPageDialog.open}
        onOpenChange={(open) => setEditPageDialog({ open })}
        onSubmit={handleUpdatePage}
        initialData={
          editPageDialog.pageId
            ? pages.find((p) => p.id === editPageDialog.pageId)
            : undefined
        }
      />

      <DeleteConfirmDialog
        open={deletePageDialog.open}
        onOpenChange={(open) => setDeletePageDialog({ open })}
        onConfirm={handleDeletePage}
        title="Delete Page?"
        description="This will delete all rows and images in this page. This action cannot be undone."
      />

      {/* Row Dialogs */}
      <AddRowDialog
        open={addRowDialog}
        onOpenChange={setAddRowDialog}
        onSubmit={handleAddRow}
      />

      <EditRowDialog
        open={editRowDialog.open}
        onOpenChange={(open) => setEditRowDialog({ open })}
        onSubmit={handleUpdateRow}
        initialData={
          editRowDialog.rowId
            ? rows.find((r) => r.id === editRowDialog.rowId)
            : undefined
        }
      />

      <DeleteConfirmDialog
        open={deleteRowDialog.open}
        onOpenChange={(open) => setDeleteRowDialog({ open })}
        onConfirm={handleDeleteRow}
        title="Delete Row?"
        description="This will delete all images in this row. This action cannot be undone."
      />

      {/* Image Dialogs */}
      <AddImageDialog
        open={addImageDialog.open}
        onOpenChange={(open) => setAddImageDialog({ open })}
        onSubmit={handleAddImage}
      />

      <EditImageDialog
        open={editImageDialog.open}
        onOpenChange={(open) => setEditImageDialog({ open })}
        onSubmit={handleUpdateImage}
        initialData={
          editImageDialog.imageId
            ? images.find((img) => img.id === editImageDialog.imageId)
            : undefined
        }
      />

      <DeleteConfirmDialog
        open={deleteImageDialog.open}
        onOpenChange={(open) => setDeleteImageDialog({ open })}
        onConfirm={handleDeleteImage}
        title="Delete Image?"
        description="This action cannot be undone."
      />
    </div>
  );
}
