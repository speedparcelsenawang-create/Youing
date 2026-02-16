#!/bin/bash
# Commit cleanup and Image Gallery implementation

echo "📝 Staging changes..."

# Add all modified and new files
git add -A

echo "💾 Creating commit..."

git commit -m "refactor: cleanup unused components and implement Image Gallery

- Removed unused submenu components (3 files)
- Removed unused page-content components (5 files)  
- Removed unused hooks and types (2 files)
- Cleaned up unused documentation files (5 files)
- Organized docs into docs/ folder
- Removed Standard, Shell, and Page Content submenus from Plano
- Kept only Image Gallery in Plano menu
- Updated App.tsx with simplified navigation
- Fixed duplicate headers in ImageGalleryManager

Files kept:
- Image Gallery components (grid, dialogs, navigation)
- Image Gallery pages (manager, example)
- Image Gallery types and documentation

Total files removed: 15
New folder structure: docs/"

echo "✅ Commit complete!"
echo ""
echo "To push to remote:"
echo "  git push origin main"
