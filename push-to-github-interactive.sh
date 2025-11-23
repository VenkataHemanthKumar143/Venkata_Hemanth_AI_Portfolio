#!/bin/bash

# Interactive script to push to GitHub
# Note: GitHub no longer accepts passwords - you need a Personal Access Token (PAT)

echo "=========================================="
echo "GitHub Push Script (Interactive)"
echo "=========================================="
echo ""
echo "⚠️  IMPORTANT: GitHub no longer accepts passwords!"
echo "   You need a Personal Access Token (PAT) instead."
echo ""
echo "📝 To create a token:"
echo "   1. Go to: https://github.com/settings/tokens"
echo "   2. Click 'Generate new token' → 'Generate new token (classic)'"
echo "   3. Give it a name (e.g., 'Portfolio Push')"
echo "   4. Select 'repo' scope (full control)"
echo "   5. Click 'Generate token' and copy it"
echo ""
echo "=========================================="
echo ""

# Method 1: Try to use token from .env file first
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "✅ Found GITHUB_TOKEN in .env file"
        USE_ENV_TOKEN=true
    else
        USE_ENV_TOKEN=false
    fi
else
    USE_ENV_TOKEN=false
fi

# If no token in .env, prompt for credentials
if [ "$USE_ENV_TOKEN" = false ]; then
    echo "Enter your GitHub credentials:"
    read -p "GitHub Username/Email: " GITHUB_USERNAME
    read -sp "Personal Access Token (PAT): " GITHUB_TOKEN
    echo ""
    
    if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then
        echo "❌ Error: Username and token are required!"
        exit 1
    fi
else
    # Get username from git config or prompt
    GITHUB_USERNAME=$(git config user.name 2>/dev/null || git config user.email 2>/dev/null || echo "")
    if [ -z "$GITHUB_USERNAME" ]; then
        read -p "GitHub Username/Email: " GITHUB_USERNAME
    else
        echo "Using git config username: $GITHUB_USERNAME"
    fi
fi

# Get current branch name
BRANCH=$(git branch --show-current)

# Add all files including .gitignore
echo ""
echo "📦 Adding all files to git..."
git add .
git add .gitignore

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit."
else
    echo "💾 Committing changes..."
    git commit -m "Update portfolio: fix TypeScript errors and build configuration"
fi

# Update remote URL with token
echo "🔗 Setting up remote URL..."
if [ "$USE_ENV_TOKEN" = true ]; then
    git remote set-url origin https://${GITHUB_TOKEN}@github.com/VenkataHemanthKumar143/Venkata_AI_Portfolio.git
else
    git remote set-url origin https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/VenkataHemanthKumar143/Venkata_AI_Portfolio.git
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin ${BRANCH:-master}; then
    echo ""
    echo "✅ Push completed successfully!"
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Common issues:"
    echo "  - Invalid token (check if it has 'repo' scope)"
    echo "  - Token expired (create a new one)"
    echo "  - Repository doesn't exist or you don't have access"
    exit 1
fi

# Reset remote URL to remove token (for security)
git remote set-url origin https://github.com/VenkataHemanthKumar143/Venkata_AI_Portfolio.git

echo ""
echo "✨ Done!"

