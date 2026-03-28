# 🚀 Quick Start Deployment Guide (5 Simple Steps)

## Step 1: Prepare Your Project (5 min)
```bash
# Verify git is initialized
git init

# Commit your code
git add .
git commit -m "Ready for deployment"
```

## Step 2: Set Up Database (10 min)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free) → Create cluster → Create user
3. Copy the connection string
4. Update `server/.env` with MongoDB URI

## Step 3: Push to GitHub (5 min)
1. Create repo: https://github.com/new
2. Run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ssgmce-website.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy Backend to Render (10 min)
1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables (copy from server/.env)
7. Click Deploy
8. Copy your backend URL (e.g., `https://ssgmce-backend.onrender.com`)

## Step 5: Deploy Frontend to Vercel (10 min)
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Select your repository
5. Configure:
   - Framework: Vite
   - Root Directory: `client`
   - Build: `npm run build`
   - Output: `dist`
6. Add environment variable:
   ```
   VITE_BACKEND_URL = https://ssgmce-backend.onrender.com
   ```
7. Click Deploy
8. Copy your frontend URL (e.g., `https://ssgmce-website.vercel.app`)

## Step 6: Update CORS (2 min)
1. Go to Render dashboard
2. Update environment variable:
   ```
   CORS_ORIGIN = https://ssgmce-website.vercel.app
   ```
3. Redeploy

## Step 7: Set Up Auto-Deployment (5 min)
1. Go to Render dashboard
2. Settings → Deploy Hook → Copy webhook URL
3. Go to GitHub → Settings → Secrets and variables
4. Add secret: `RENDER_DEPLOY_HOOK` with the webhook URL
5. Done! Code changes now auto-deploy

---

## ✅ Verify It Works
- Visit: https://ssgmce-website.vercel.app
- Check logs in Render if issues
- Test API calls from frontend

---

## 🎯 Total Time: ~45 minutes

**Cost**: FREE (forever)

---

Need detailed help? See DEPLOYMENT_GUIDE.md
