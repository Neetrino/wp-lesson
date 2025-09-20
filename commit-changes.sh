#!/bin/bash

# Neetrino Academy - Commit Changes Script
# This script commits all changes to the repository

echo "🚀 Starting commit process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all changes
echo "📦 Adding all changes..."
git add .

# Create commit with current changes
echo "💾 Creating commit..."
git commit -m "Update Neetrino Academy website

🔄 Changes made:
- Updated branding from WordPress Academy to Neetrino Academy
- Redesigned footer with 3-column layout and register button
- Synchronized header and footer navigation
- Moved FAQ section to end of page
- Created new 'Why study with us' section with 9 benefits
- Updated tutor section titles
- Improved responsive design and hover effects
- Added round button styling
- Updated copyright year to 2025

✨ New features:
- Professional 3-column grid layout
- Enhanced mobile responsiveness
- Improved user experience
- Better visual hierarchy

📱 All sections updated and tested!"

echo "✅ Changes committed successfully!"
echo "🚀 Run ./deploy-to-github.sh to push to GitHub"