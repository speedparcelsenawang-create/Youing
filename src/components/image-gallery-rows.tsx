import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryRowWithImages } from "@/types/image-gallery";

interface ImageGalleryRowsProps {
  rows: GalleryRowWithImages[];
  onAddRow: () => void;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onReorderRow: (rowId: string, direction: 'up' | 'down') => void;
  onAddImageToRow: (rowId: string) => void;
  onEditImage: (imageId: string) => void;
  onDeleteImage: (imageId: string) => void;
  onImageClick?: (rowId: string, imageIndex: number) => void;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function ImageGalleryRows({
  rows,
  onAddRow,
  onEditRow,
  onDeleteRow,
  onReorderRow,
  onAddImageToRow,
  onEditImage,
  onDeleteImage,
  onImageClick,
  emptyMessage = "No rows yet",
  emptyDescription = "Create your first row to get started",
}: ImageGalleryRowsProps) {
  
  if (rows.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-2">{emptyMessage}</h2>
        <p className="text-muted-foreground mb-6">{emptyDescription}</p>
        <Button onClick={onAddRow} data-testid="button-create-first-row">
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-6 pt-24 pb-10 space-y-12 overflow-visible relative z-0">
      {rows.map((row, rowIndex) => (
        <RowSection
          key={row.id}
          row={row}
          rowIndex={rowIndex}
          isFirst={rowIndex === 0}
          isLast={rowIndex === rows.length - 1}
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
          onReorderRow={onReorderRow}
          onAddImageToRow={onAddImageToRow}
          onEditImage={onEditImage}
          onDeleteImage={onDeleteImage}
          onImageClick={onImageClick}
        />
      ))}

      <div className="pt-6">
        <Button onClick={onAddRow} variant="outline" className="w-full" data-testid="button-add-row">
          <Plus className="w-4 h-4 mr-2" />
          Add New Row
        </Button>
      </div>
    </div>
  );
}

interface RowSectionProps {
  row: GalleryRowWithImages;
  rowIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onEditRow: (rowId: string) => void;
  onDeleteRow: (rowId: string) => void;
  onReorderRow: (rowId: string, direction: 'up' | 'down') => void;
  onAddImageToRow: (rowId: string) => void;
  onEditImage: (imageId: string) => void;
  onDeleteImage: (imageId: string) => void;
  onImageClick?: (rowId: string, imageIndex: number) => void;
}

function RowSection({
  row,
  rowIndex,
  isFirst,
  isLast,
  onEditRow,
  onDeleteRow,
  onReorderRow,
  onAddImageToRow,
  onEditImage,
  onDeleteImage,
}: RowSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleAction = (action: () => void) => {
    action();
    setMenuOpen(false);
  };

  return (
    <div className="space-y-5 overflow-visible relative z-10" data-testid={`row-section-${rowIndex}`}>
      {/* Header with Title, Description, and Menu */}
      <div className="flex items-start justify-between gap-4 px-1 overflow-visible">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold" data-testid={`row-title-${rowIndex}`}>
            {row.title}
          </h2>
          {row.description && (
            <p className="text-sm text-muted-foreground mt-1" data-testid={`row-description-${rowIndex}`}>
              {row.description}
            </p>
          )}
        </div>

        {/* Row Menu Button */}
        <Button 
          variant="outline" 
          size="sm"
          className="gap-1"
          onClick={() => setMenuOpen(true)}
          data-testid={`row-menu-${rowIndex}`}
        >
          <MoreVertical className="w-4 h-4" />
          Menu
        </Button>

        {/* Row Menu Modal */}
        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Row Actions</DialogTitle>
              <DialogDescription>
                Choose an action for "{row.title}"
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 py-4">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => handleAction(() => onEditRow(row.id))}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Row
              </Button>
              
              {!isFirst && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleAction(() => onReorderRow(row.id, 'up'))}
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Move Up
                </Button>
              )}
              
              {!isLast && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleAction(() => onReorderRow(row.id, 'down'))}
                >
                  <ArrowDown className="w-4 h-4 mr-2" />
                  Move Down
                </Button>
              )}
              
              <Button
                variant="destructive"
                className="justify-start"
                onClick={() => handleAction(() => onDeleteRow(row.id))}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Row
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Horizontal Scroll Container with Navigation */}
      <div className="relative group overflow-visible">
        {/* Navigation Arrows - Only show if there are images */}
        {row.images.length > 0 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
              onClick={scrollLeft}
              data-testid={`row-scroll-left-${rowIndex}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
              onClick={scrollRight}
              data-testid={`row-scroll-right-${rowIndex}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Scrollable Images Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Existing Images */}
          {row.images.map((image, imageIndex) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-64 h-64 relative group/card cursor-pointer"
              data-testid={`image-card-${rowIndex}-${imageIndex}`}
            >
              <Card className="w-full h-full overflow-hidden">
                {/* Full Image Background */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  data-testid={`image-${rowIndex}-${imageIndex}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x225?text=Image+Not+Found";
                  }}
                />

                {/* Title and Subtitle with Backdrop */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm p-3">
                  <h3 className="font-medium text-sm text-white truncate" data-testid={`image-title-${rowIndex}-${imageIndex}`}>
                    {image.title}
                  </h3>
                  {image.subtitle && (
                    <p className="text-xs text-white/80 truncate" data-testid={`image-subtitle-${rowIndex}-${imageIndex}`}>
                      {image.subtitle}
                    </p>
                  )}
                </div>
              </Card>

              {/* Edit/Delete Buttons - Outside Card, Centered Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 bg-black/60 rounded-lg">
                <div className="flex gap-4 z-50">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-xl bg-white hover:bg-gray-100 hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditImage(image.id);
                    }}
                    data-testid={`image-edit-${rowIndex}-${imageIndex}`}
                  >
                    <Edit className="w-6 h-6 text-black" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-xl hover:scale-110 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteImage(image.id);
                    }}
                    data-testid={`image-delete-${rowIndex}-${imageIndex}`}
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Image Card with Dashed Border */}
          <Card
            className="flex-shrink-0 w-64 h-64 border-2 border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 transition-colors cursor-pointer bg-muted/20"
            onClick={() => onAddImageToRow(row.id)}
            data-testid={`add-image-card-${rowIndex}`}
          >
            <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-8 h-8" />
              <span className="text-sm font-medium">Add Image</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Hide scrollbar CSS (add to global CSS if needed)
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(style);
