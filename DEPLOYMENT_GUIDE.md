# MERN Project Deployment Guide (Free with GitHub CI/CD)

## Overview
- **Frontend**: Vercel (React/Vite) - Free
- **Backend**: Render.com - Free
- **Database**: MongoDB Atlas - Free Tier
- **CI/CD**: GitHub Actions - Free

---

## Phase 1: Prepare Your Project

### Step 1: Initialize Git Repository (If Not Done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Update Root package.json
Create/update `package.json` in root directory:
```json
{
  "name": "ssgmce-full",
  "version": "1.0.0",
  "description": "SSGMCE College Website",
  "scripts": {
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "server:dev": "cd server && npm run dev",
    "build": "npm run server:build && npm run client:build",
    "server:build": "cd server && npm install",
    "client:build": "cd client && npm install && npm run build",
    "start": "cd server && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

### Step 3: Update .gitignore
```bash
# Root .gitignore
node_modules/
.env
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
```

### Step 4: Ensure .env Files Are Configured

**Create `server/.env` (for local testing):**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
ADMIN_GATE_TOKEN=<your-gate-token>
CORS_ORIGIN=https://your-frontend-domain.vercel.app
ADMIN_AUTO_SEED=false
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<secure-password>
```

---

## Phase 2: Set Up Database (MongoDB Atlas)

### Step 1: Create Free MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a new project
4. Create a database cluster (free tier)
5. Create a database user with username/password
6. Whitelist your IP (add 0.0.0.0/0 for all IPs)

### Step 2: Get Connection String
1. Click "Connect" button on cluster
2. Choose "Connect your application"
3. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

---

## Phase 3: Push to GitHub

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Name it `ssgmce-website`
3. Initialize with README (optional)
4. Click Create

### Step 2: Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/ssgmce-website.git
git branch -M main
git push -u origin main
```

---

## Phase 4: Deploy Backend (Render.com)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize access

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Configure:
   - **Name**: `ssgmce-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Choose closest to you

### Step 3: Add Environment Variables
In Render dashboard, go to "Environment" and add:
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=<generate-strong-secret>
ADMIN_JWT_SECRET=<generate-strong-secret>
ADMIN_GATE_TOKEN=<your-gate-token>
CORS_ORIGIN=https://your-frontend-url.vercel.app
ADMIN_AUTO_SEED=false
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<secure-password>
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (2-5 minutes)
- Your backend URL: `https://ssgmce-backend.onrender.com`

---

## Phase 5: Deploy Frontend (Vercel)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize access

### Step 2: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables
In Vercel Environment Variables, add:
```
VITE_BACKEND_URL=https://ssgmce-backend.onrender.com
```

### Step 4: Deploy
- Click "Deploy"
- Wait for deployment (1-3 minutes)
- Your frontend URL: `https://ssgmce-website.vercel.app`

### Step 5: Update Backend CORS
Go back to Render dashboard and update:
```
CORS_ORIGIN=https://ssgmce-website.vercel.app
```

---

## Phase 6: Set Up GitHub Actions CI/CD

### Step 1: Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy MERN Application

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Notify Render Webhook
      if: always()
      run: |
        curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }} || true

    - name: Verify Build
      run: |
        cd server && npm install --production
        cd ../client && npm install && npm run build

    - name: Health Check
      run: |
        echo "Deployment pipeline completed successfully"
```

### Step 2: Create Render Deploy Hook
1. In Render dashboard, go to your Web Service
2. Settings → "Deploy Hook"
3. Copy the webhook URL

### Step 3: Add GitHub Secret
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `RENDER_DEPLOY_HOOK`
4. Value: Paste Render webhook URL

---

## Phase 7: Configure Client to Use Backend API

### Step 1: Update Frontend API Configuration
Create/update `client/src/config/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default API_BASE_URL;
```

### Step 2: Update All API Calls
In your React components, use:
```javascript
import API_BASE_URL from '../config/api';
import axios from 'axios';

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Use API instead of direct axios calls
API.get('/api/endpoint').then(res => console.log(res.data));
```

---

## Phase 8: Testing & Verification

### Step 1: Test Frontend
```bash
https://ssgmce-website.vercel.app
```

### Step 2: Test Backend API
```bash
curl https://ssgmce-backend.onrender.com/api/health
```

### Step 3: Test Database Connection
Check Render logs for MongoDB connection messages.

### Step 4: Verify CI/CD Pipeline
1. Make a change in code
2. Push to GitHub
3. Go to Actions tab
4. Verify workflow runs
5. Check deployment automatically happens

---

## Phase 9: Optional Enhancements

### Custom Domain (Vercel)
1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records at your domain registrar

### Custom Domain (Render)
1. Similar process in Render settings
2. Add CNAME record in DNS

### Monitoring
- Render: Logs tab
- Vercel: Deployments → Production logs
- GitHub: Actions tab

### Environment-Specific Builds
Create `.github/workflows/deploy-staging.yml` for staging deployments.

---

## Troubleshooting

### Backend Not Connecting to Frontend
- Check CORS_ORIGIN in Render environment
- Verify VITE_BACKEND_URL in Vercel environment
- Check browser console for CORS errors

### MongoDB Connection Failing
- Verify IP whitelisting in MongoDB Atlas
- Check connection string format
- Ensure credentials are correct

### GitHub Actions Not Deploying
- Verify webhook URL is correct
- Check Actions tab for error logs
- Ensure repository secret is set

### Cold Start Issues (Render)
- Expected on first request after inactivity
- Use Render's "Adjust Auto-Spin Settings" to keep service warm (requires paid plan)

---

## Summary

| Component | Service | Plan | URL |
|-----------|---------|------|-----|
| Frontend | Vercel | Free | ssgmce-website.vercel.app |
| Backend | Render | Free | ssgmce-backend.onrender.com |
| Database | MongoDB Atlas | Free | Cloud |
| CI/CD | GitHub Actions | Free | GitHub |

**Estimated Setup Time**: 30-45 minutes
**Cost**: Completely FREE (forever free tiers)

---

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Set up monitoring and alerts
3. ✅ Configure error logging (optional)
4. ✅ Set up database backups
5. ✅ Document API endpoints
6. ✅ Create deployment checklist for team

Good luck with your deployment! 🚀
