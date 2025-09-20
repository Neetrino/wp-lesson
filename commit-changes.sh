#!/bin/bash

# WordPress Academy - Commit Changes Script
# This script commits all changes to the repository

echo "🚀 Starting commit process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
fi

# Add all files
echo "📁 Adding files to staging..."
git add .

# Check status
echo "📊 Git status:"
git status

# Commit with message
echo "💾 Committing changes..."
git commit -m "feat: restore WordPress animated block in hero section

- Restored elementor-builder block in hero section
- Added all CSS styles for WordPress animation
- Updated hero layout to two-column grid
- Added responsive design for mobile devices
- Restored floating animation and hover effects

Changes:
- index.html: Added hero-image div with elementor-builder
- styles.css: Added complete elementor styles and animations
- Mobile responsive design updated"

echo "✅ Commit completed successfully!"
echo "📝 Commit message: 'feat: restore WordPress animated block in hero section'"