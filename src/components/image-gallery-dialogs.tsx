import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ==================== PAGE DIALOGS ====================

interface AddGalleryPageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; description?: string }) => void;
}

export function AddGalleryPageDialog({ open, onOpenChange, onSubmit }: AddGalleryPageDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name, description: description || undefined });
      setName("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-add-gallery-page">
        <DialogHeader>
          <DialogTitle>Add New Gallery Page</DialogTitle>
          <DialogDescription>
            Create a new page to organize your images.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gallery-page-name">Page Name *</Label>
            <Input
              id="gallery-page-name"
              placeholder="e.g., Nature Photos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && name.trim() && handleSubmit()}
              data-testid="input-gallery-page-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-page-description">Description (Optional)</Label>
            <Input
              id="gallery-page-description"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-gallery-page-description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()} data-testid="button-submit">
            Create Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EditGalleryPageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; description?: string }) => void;
  initialData?: { name: string; description?: string };
}

export function EditGalleryPageDialog({ open, onOpenChange, onSubmit, initialData }: EditGalleryPageDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name, description: description || undefined });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-edit-gallery-page">
        <DialogHeader>
          <DialogTitle>Edit Gallery Page</DialogTitle>
          <DialogDescription>
            Update the page details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-gallery-page-name">Page Name *</Label>
            <Input
              id="edit-gallery-page-name"
              placeholder="Page name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && name.trim() && handleSubmit()}
              data-testid="input-gallery-page-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-gallery-page-description">Description</Label>
            <Input
              id="edit-gallery-page-description"
              placeholder="Page description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-gallery-page-description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()} data-testid="button-submit">
            Update Page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== IMAGE DIALOGS ====================

interface AddImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { url: string; title: string; subtitle?: string }) => void;
}

export function AddImageDialog({ open, onOpenChange, onSubmit }: AddImageDialogProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = () => {
    if (url.trim() && title.trim()) {
      onSubmit({ url, title, subtitle: subtitle || undefined });
      setUrl("");
      setTitle("");
      setSubtitle("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-add-image">
        <DialogHeader>
          <DialogTitle>Add New Image</DialogTitle>
          <DialogDescription>
            Add an image to this gallery page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL *</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid="input-image-url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-title">Title *</Label>
            <Input
              id="image-title"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-image-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-subtitle">Subtitle (Optional)</Label>
            <Input
              id="image-subtitle"
              placeholder="Image subtitle or description"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              data-testid="input-image-subtitle"
            />
          </div>
          {url && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="aspect-video rounded-md overflow-hidden bg-muted">
                <img
                  src={url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x300?text=Invalid+URL";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim() || !title.trim()} data-testid="button-submit">
            Add Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EditImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { url: string; title: string; subtitle?: string }) => void;
  initialData?: { url: string; title: string; subtitle?: string };
}

export function EditImageDialog({ open, onOpenChange, onSubmit, initialData }: EditImageDialogProps) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setUrl(initialData.url || "");
      setTitle(initialData.title || "");
      setSubtitle(initialData.subtitle || "");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (url.trim() && title.trim()) {
      onSubmit({ url, title, subtitle: subtitle || undefined });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-edit-image">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogDescription>
            Update the image details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-image-url">Image URL *</Label>
            <Input
              id="edit-image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid="input-image-url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-image-title">Title *</Label>
            <Input
              id="edit-image-title"
              placeholder="Image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-image-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-image-subtitle">Subtitle</Label>
            <Input
              id="edit-image-subtitle"
              placeholder="Image subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              data-testid="input-image-subtitle"
            />
          </div>
          {url && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="aspect-video rounded-md overflow-hidden bg-muted">
                <img
                  src={url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x300?text=Invalid+URL";
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim() || !title.trim()} data-testid="button-submit">
            Update Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== DELETE CONFIRMATION DIALOG ====================

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}: DeleteConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-delete-confirm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} data-testid="button-confirm-delete">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
