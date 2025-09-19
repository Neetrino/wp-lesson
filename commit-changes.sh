#!/bin/bash

# WordPress Lesson Project - Commit Changes
# This script commits all changes made to the project

echo "🚀 Committing WordPress Lesson Project changes..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all changes
echo "📝 Adding all changes..."
git add .

# Check status
echo "📊 Git status:"
git status

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "feat: Update WordPress lesson dashboard and course info

- Changed course duration from 3 weeks to 3 months
- Updated dashboard header to 'Built a website'
- Removed logo, save, preview, publish buttons from header
- Made 'Components' title smaller
- Replaced Settings panel with Website Preview mockup
- Added new Course Info section with 4 blocks:
  * Monthly price: 35,000 AMD
  * Duration: 3 months
  * Format: offline/online
  * Schedule: 2 days per week
- Made info blocks display in single line with smaller size
- Improved responsive design for mobile devices
- Updated all Armenian text references to reflect 3-month duration"

echo "✅ Changes committed successfully!"
echo "📋 Summary of changes:"
echo "   - Dashboard redesign completed"
echo "   - Course duration updated to 3 months"
echo "   - New course info section added"
echo "   - Responsive design improved"