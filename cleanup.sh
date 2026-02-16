,#!/bin/bash
# Cleanup unused files and organize docs

echo "🧹 Cleaning up unused files..."

# Remove unused component files
rm -f src/components/submenu.tsx
rm -f src/components/submenu-dialog.tsx  
rm -f src/components/submenu/index.ts
rm -f src/components/page-content-dialogs.tsx
rm -f src/components/content-list.tsx

# Remove unused page files
rm -f src/pages/submenu-example.tsx
rm -f src/pages/page-content-example.tsx
rm -f src/pages/page-content-manager.tsx

# Remove unused hooks and types
rm -f src/hooks/use-submenu.ts
rm -f src/types/page-content.ts

# Remove empty directories
rmdir src/components/submenu 2>/dev/null || true

echo "📁 Organizing documentation..."

# Create docs folder
mkdir -p docs

# Copy IMAGE_GALLERY_GUIDE.md to docs (keep original for now)
cp IMAGE_GALLERY_GUIDE.md docs/IMAGE_GALLERY_GUIDE.md 2>/dev/null || true

# Remove unused MD files
rm -f HOW_TO_VIEW_PAGE_CONTENT.md
rm -f PAGE_CONTENT_QUICKSTART.md
rm -f PAGE_CONTENT_README.md
rm -f SUBMENU_README.md
rm -f SUBMENU_QUICKSTART.md

# Now remove original IMAGE_GALLERY_GUIDE.md from root
rm -f IMAGE_GALLERY_GUIDE.md

echo "✅ Cleanup complete!"
echo ""
echo "Removed:"
echo "  - 5 unused component files"
echo "  - 3 unused page files"
echo "  - 2 unused hooks/types files"
echo "  - 5 unused documentation files"
echo ""
echo "Organized:"
echo "  - docs/IMAGE_GALLERY_GUIDE.md"
