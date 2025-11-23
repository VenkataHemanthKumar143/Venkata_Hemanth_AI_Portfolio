#!/bin/bash

# Script to push to GitHub using token from .env file

# Load environment variables from .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "Error: .env file not found!"
    echo "Please create a .env file with GITHUB_TOKEN=your_token_here"
    exit 1
fi

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN not found in .env file!"
    echo "Please add GITHUB_TOKEN=your_token_here to your .env file"
    exit 1
fi

# Get current branch name
BRANCH=$(git branch --show-current)

# Add all files including .gitignore
echo "Adding all files to git..."
git add .
git add .gitignore

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "No changes to commit."
else
    echo "Committing changes..."
    git commit -m "Update portfolio: fix TypeScript errors and build configuration"
fi

# Update remote URL with token
git remote set-url origin https://${GITHUB_TOKEN}@github.com/VenkataHemanthKumar143/Venkata_AI_Portfolio.git

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin ${BRANCH:-master}

# Reset remote URL to remove token (for security)
git remote set-url origin https://github.com/VenkataHemanthKumar143/Venkata_AI_Portfolio.git

echo "Push completed!"

