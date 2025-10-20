# GitHub Pages Deployment Guide

## 🚀 Automatic Deployment Setup

Your site is now configured to automatically build and deploy to GitHub Pages every time you push to the `main` branch!

## 📋 Setup Instructions

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. That's it! Your site will deploy automatically

### 3. Configure Base Path (Important!)

**Option A: User/Organization Site (`username.github.io`)**
- Keep `base: '/'` in `vite.config.ts` (already set)
- Your site will be at: `https://username.github.io/`

**Option B: Project Site (`username.github.io/repo-name`)**
- Change `base: '/'` to `base: '/repo-name/'` in `vite.config.ts`
- Replace `repo-name` with your actual repository name
- Your site will be at: `https://username.github.io/repo-name/`

Example for project site:
```typescript
// In vite.config.ts
base: '/hanleys-hood-reimagined/',
```

### 4. Wait for Deployment

- After pushing, go to the **Actions** tab in your GitHub repo
- You'll see the deployment workflow running
- Once complete (usually 1-2 minutes), your site is live!
- Visit: `https://YOUR-USERNAME.github.io/` or `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 🔄 Automatic Updates

Every time you push to `main`, GitHub Actions will:
1. ✅ Install dependencies
2. ✅ Build the TypeScript/React app
3. ✅ Deploy to GitHub Pages
4. ✅ Your site updates automatically (no manual build needed!)

## 🛠️ Manual Deployment (Optional)

If you want to deploy manually without pushing:

```bash
# Build locally
npm run build

# The dist folder contains your built site
# You can upload this to any static hosting service
```

## 📁 What's Included

- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `vite.config.ts` - Updated with base path configuration
- All your existing code will build and deploy automatically

## ⚡ Quick Commands

```bash
# Make changes to your code
# ... edit files ...

# Commit and push
git add .
git commit -m "Your commit message"
git push

# GitHub Actions automatically builds and deploys!
# Check progress: https://github.com/YOUR-USERNAME/YOUR-REPO/actions
```

## 🐛 Troubleshooting

### Site shows 404 or blank page
- Check the `base` path in `vite.config.ts` matches your repo structure
- For `username.github.io`: use `base: '/'`
- For `username.github.io/repo-name`: use `base: '/repo-name/'`

### Build fails in GitHub Actions
- Check the Actions tab for error details
- Make sure all dependencies are in `package.json`
- Test locally with `npm run build`

### Assets not loading
- Verify the base path is correct
- Check browser console for 404 errors
- Assets should load from the correct base path

## 📝 Notes

- First deployment may take 2-3 minutes
- Subsequent deployments are faster (~1 minute)
- You can trigger manual deployment from the Actions tab
- The workflow runs on every push to `main` branch
- You can customize the workflow in `.github/workflows/deploy.yml`
