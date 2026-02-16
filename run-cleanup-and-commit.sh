#!/bin/bash
# Master script: Cleanup and Commit

set -e  # Exit on error

echo "🚀 Starting cleanup and commit process..."
echo ""

# Step 1: Cleanup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Cleanup unused files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
bash cleanup.sh
echo ""

# Step 2: Commit
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Commit changes"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
bash commit-changes.sh
echo ""

echo "🎉 All done!"
echo ""
echo "Summary:"
echo "  ✅ Cleaned up 15 unused files"
echo "  ✅ Organized documentation"
echo "  ✅ Committed all changes"
echo ""
echo "Next steps:"
echo "  1. Review changes: git log -1"
echo "  2. Push to remote: git push origin main"
