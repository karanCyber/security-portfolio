# Vercel Deployment Guide

Your security portfolio is ready to deploy to Vercel! Follow these steps to make it live online.

## Quick Deploy (Easiest Way)

### Option 1: Deploy via Vercel Website (Recommended)

1. **Create a GitHub repository** (if you haven't already)
   - Go to https://github.com/new
   - Create a new repository named `security-portfolio`
   - Push your local code to GitHub

2. **Deploy to Vercel**
   - Visit https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"
   - Vercel will automatically detect your Vite setup
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Deploy from your project directory
vercel

# 3. Follow the prompts:
# - Choose your username
# - Set project name
# - Select framework (select "Vite")
# - Link to existing project? (N for first-time)

# 4. Your site will be live!
```

## After Deployment

- **Custom Domain**: Add a custom domain in Vercel project settings
- **Environment Variables**: Add any API keys in "Settings" → "Environment Variables"
- **Automatic Deployments**: Push to GitHub and Vercel will auto-deploy
- **Production URL**: Use the `.vercel.app` domain or your custom domain

## What Happens During Build

- `npm install` installs dependencies
- `npm run build` compiles TypeScript and builds with Vite
- Assets are optimized and deployed to Vercel's CDN globally

Your Vite configuration is already perfect for Vercel - no changes needed!
