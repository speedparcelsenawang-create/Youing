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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// ==================== ROW DIALOGS ====================

interface AddRowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; description?: string }) => void;
}

export function AddRowDialog({ open, onOpenChange, onSubmit }: AddRowDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, description: description || undefined });
      setTitle("");
      setDescription("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-add-row">
        <DialogHeader>
          <DialogTitle>Add New Row</DialogTitle>
          <DialogDescription>
            Create a new row for organizing images.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="row-title">Row Title *</Label>
            <Input
              id="row-title"
              placeholder="e.g., Summer Vacation 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && title.trim() && handleSubmit()}
              data-testid="input-row-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="row-description">Description (Optional)</Label>
            <Input
              id="row-description"
              placeholder="Brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-row-description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()} data-testid="button-submit">
            Create Row
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface EditRowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { title: string; description?: string }) => void;
  initialData?: { title: string; description?: string };
}

export function EditRowDialog({ open, onOpenChange, onSubmit, initialData }: EditRowDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({ title, description: description || undefined });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-edit-row">
        <DialogHeader>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogDescription>
            Update the row details.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-row-title">Row Title *</Label>
            <Input
              id="edit-row-title"
              placeholder="Row title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && title.trim() && handleSubmit()}
              data-testid="input-row-title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-row-description">Description</Label>
            <Input
              id="edit-row-description"
              placeholder="Row description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="input-row-description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()} data-testid="button-submit">
            Update Row
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState("url");

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setUrl("");
      setTitle("");
      setSubtitle("");
      setSelectedFile(null);
      setFilePreview("");
      setActiveTab("url");
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (activeTab === "url") {
      if (url.trim() && title.trim()) {
        onSubmit({ url, title, subtitle: subtitle || undefined });
        setUrl("");
        setTitle("");
        setSubtitle("");
        onOpenChange(false);
      }
    } else {
      // For file upload, use the preview URL as the image URL
      if (filePreview && title.trim()) {
        onSubmit({ url: filePreview, title, subtitle: subtitle || undefined });
        setSelectedFile(null);
        setFilePreview("");
        setTitle("");
        setSubtitle("");
        onOpenChange(false);
      }
    }
  };

  const isSubmitDisabled = activeTab === "url" 
    ? !url.trim() || !title.trim()
    : !filePreview || !title.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-add-image">
        <DialogHeader>
          <DialogTitle>Add New Image</DialogTitle>
          <DialogDescription>
            Add an image by URL or upload from your device.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">By URL</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>
          
          {/* URL Tab */}
          <TabsContent value="url" className="space-y-4">
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
              <Label htmlFor="image-title-url">Title *</Label>
              <Input
                id="image-title-url"
                placeholder="Image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-testid="input-image-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-subtitle-url">Subtitle (Optional)</Label>
              <Input
                id="image-subtitle-url"
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
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-file">Select Image *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  data-testid="input-image-file"
                  className="cursor-pointer"
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-title-upload">Title *</Label>
              <Input
                id="image-title-upload"
                placeholder="Image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-testid="input-image-title-upload"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-subtitle-upload">Subtitle (Optional)</Label>
              <Input
                id="image-subtitle-upload"
                placeholder="Image subtitle or description"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                data-testid="input-image-subtitle-upload"
              />
            </div>
            {filePreview && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="aspect-video rounded-md overflow-hidden bg-muted">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitDisabled} data-testid="button-submit">
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
