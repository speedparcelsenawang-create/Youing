import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GalleryImage } from "@/types/image-gallery";

interface ImageGalleryGridProps {
  images: GalleryImage[];
  onAddImage: () => void;
  onEditImage: (imageId: string) => void;
  onDeleteImage: (imageId: string) => void;
  onImageClick?: (image: GalleryImage, index: number) => void;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function ImageGalleryGrid({
  images,
  onAddImage,
  onEditImage,
  onDeleteImage,
  onImageClick,
  emptyMessage = "No images yet",
  emptyDescription = "Upload your first image to get started",
}: ImageGalleryGridProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-2">{emptyMessage}</h2>
        <p className="text-muted-foreground mb-6">{emptyDescription}</p>
        <Button onClick={onAddImage} data-testid="button-create-first-image">
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <Card
            key={image.id}
            className="overflow-hidden group relative cursor-pointer"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
            data-testid={`card-image-${index}`}
          >
            <div
              className="relative aspect-square overflow-hidden"
              onClick={() => onImageClick?.(image, index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                data-testid={`img-gallery-${index}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                }}
              />
              {hoveredImage === image.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-8 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditImage(image.id);
                    }}
                    data-testid={`button-edit-image-${index}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {onImageClick && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        onImageClick(image, index);
                      }}
                      data-testid={`button-view-image-${index}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="w-8 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteImage(image.id);
                    }}
                    data-testid={`button-delete-image-${index}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate" data-testid={`text-image-title-${index}`}>
                {image.title}
              </h3>
              {image.subtitle && (
                <p className="text-xs text-muted-foreground truncate" data-testid={`text-image-subtitle-${index}`}>
                  {image.subtitle}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={onAddImage} variant="outline" className="w-full" data-testid="button-add-image">
          <Plus className="w-4 h-4 mr-2" />
          Add New Image
        </Button>
      </div>
    </div>
  );
}
