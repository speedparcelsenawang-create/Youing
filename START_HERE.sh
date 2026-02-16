#!/bin/bash
# Quick Start Guide
# Run this to cleanup and commit everything

echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃  Youing Project - Cleanup & Commit          ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""
echo "This will:"
echo "  1. Remove 15 unused files"
echo "  2. Organize documentation"  
echo "  3. Commit all changes"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "🚀 Starting process..."
    bash ./run-cleanup-and-commit.sh
else
    echo ""
    echo "❌ Cancelled"
    exit 1
fi
