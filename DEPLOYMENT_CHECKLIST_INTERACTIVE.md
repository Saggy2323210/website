# 📋 Interactive Deployment Checklist

**Status**: Starting
**Date Started**: March 28, 2026
**Estimated Total Time**: 60 minutes

---

## 🟦 Phase 1: MongoDB Setup (15 min)

### Account & Cluster
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Sign up with email
- [ ] Verify email
- [ ] Create free cluster (M0)
- [ ] Wait for cluster to be ready (2-3 min)
- [ ] Cluster name: `SSGMCE_cluster-0`

### Database User
- [ ] Go to "Database Access"
- [ ] Click "Add New Database User"
- [ ] **Username**: `ssgmce_user`
- [ ] **Password**: Generate & save it securely
- [ ] **Role**: "Atlas admin"
- [ ] User created ✓

### Connection String
- [ ] Go to "Clusters" → Connect button
- [ ] Choose "Connect your application"
- [ ] Select "Node.js" version 5.5+
- [ ] Copy connection string
- [ ] Replace `<password>` with actual password
- [ ] Replace database name with `ssgmce`
- [ ] Save connection string (paste into .env next)

### IP Whitelist
- [ ] Go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Select "Allow access from anywhere"
- [ ] IP whitelist complete (0.0.0.0/0)

**MongoDB Ready**: ✓

---

## 🟦 Phase 2: Create Environment File (5 min)

### Create .env file in `server/` folder
- [ ] Create file: `server/.env`
- [ ] Copy template from FULL_DEPLOYMENT.md
- [ ] Fill in:
  - [ ] `MONGODB_URI` from MongoDB
  - [ ] `JWT_SECRET` (generate random)
  - [ ] `ADMIN_JWT_SECRET` (generate random)
  - [ ] `ADMIN_GATE_TOKEN` (any string)
  - [ ] `ADMIN_EMAIL` (your email)
  - [ ] `ADMIN_PASSWORD` (strong password)
- [ ] Save file
- [ ] **Do NOT commit** .env file (it's in .gitignore)

**Environment File Ready**: ✓

---

## 🟦 Phase 3: Deploy Backend to Render (20 min)

### Account Setup
- [ ] Go to https://render.com
- [ ] Click "Sign up"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Render
- [ ] Email verified

### Create Web Service
- [ ] Click "New +" button
- [ ] Select "Web Service"
- [ ] Choose repository: `website`
- [ ] Connect GitHub

### Configure Service
- [ ] **Name**: `ssgmce-backend`
- [ ] **Runtime**: `Node`
- [ ] **Root Directory**: `server`
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Region**: Select closest to you

### Environment Variables (copy from your .env)
- [ ] `PORT=5000`
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=<from MongoDB>`
- [ ] `JWT_SECRET=<your secret>`
- [ ] `ADMIN_JWT_SECRET=<your secret>`
- [ ] `ADMIN_GATE_TOKEN=<your token>`
- [ ] `CORS_ORIGIN=http://localhost:3000` (temporary)
- [ ] `ADMIN_AUTO_SEED=true`
- [ ] `ADMIN_EMAIL=<your email>`
- [ ] `ADMIN_PASSWORD=<your password>`
- [ ] `ADMIN_NAME=Admin`

### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 min)
- [ ] Check for green checkmark ✓
- [ ] Copy backend URL: `https://ssgmce-backend.onrender.com`
- [ ] Test URL in browser (should see JSON response)

**Backend Deployed**: ✓ `https://ssgmce-backend.onrender.com`

---

## 🟦 Phase 4: Deploy Frontend to Vercel (15 min)

### Account Setup
- [ ] Go to https://vercel.com
- [ ] Click "Sign up"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Vercel
- [ ] Email verified

### Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Choose repository: `Saggy2323210/website`
- [ ] Click "Import"

### Configure Deployment
- [ ] **Framework**: Select "Vite"
- [ ] **Root Directory**: Change to `client`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`

### Environment Variable
- [ ] Add: `VITE_BACKEND_URL=https://ssgmce-backend.onrender.com`
- [ ] Click "Deploy"
- [ ] Wait for build (3-5 min)
- [ ] Watch for green checkmarks ✓

### Test
- [ ] Deployment complete
- [ ] Copy frontend URL: `https://ssgmce-website.vercel.app`
- [ ] Click "Visit" to open website
- [ ] Website loads successfully

**Frontend Deployed**: ✓ `https://ssgmce-website.vercel.app`

---

## 🟦 Phase 5: Connect Services (5 min)

### Update Backend CORS
- [ ] Go to Render dashboard
- [ ] Select `ssgmce-backend`
- [ ] Go to "Environment"
- [ ] Update `CORS_ORIGIN`: `https://ssgmce-website.vercel.app`
- [ ] Click "Save"
- [ ] Wait for auto-redeploy

### Test Connection
- [ ] Open frontend: `https://ssgmce-website.vercel.app`
- [ ] Press F12 (open DevTools)
- [ ] Go to "Console" tab
- [ ] Check for any CORS errors
- [ ] Try clicking a page that fetches data
- [ ] Verify data loads without errors

**Services Connected**: ✓

---

## 🟦 Phase 6: GitHub Auto-Deploy Setup (5 min)

### Get Render Webhook
- [ ] Go to Render dashboard
- [ ] Select `ssgmce-backend`
- [ ] Go to "Settings"
- [ ] Find "Deploy Hook"
- [ ] Copy the webhook URL

### Add GitHub Secret
- [ ] Go to GitHub: https://github.com/Saggy2323210/website
- [ ] Settings → Secrets and variables → Actions
- [ ] Click "New repository secret"
- [ ] **Name**: `RENDER_DEPLOY_HOOK`
- [ ] **Value**: Paste webhook URL
- [ ] Click "Add secret"

### Test Auto-Deploy
- [ ] Make small change to code (any file)
- [ ] Commit: `git add . && git commit -m "test: CI/CD"`
- [ ] Push: `git push origin main`
- [ ] Check GitHub Actions (should be running)
- [ ] Check Render dashboard (should be redeploying)
- [ ] Wait for completion

**Auto-Deployment Working**: ✓

---

## ✅ Final Verification

### MongoDB
- [ ] Cluster running
- [ ] User created
- [ ] Can connect (test in Render logs)

### Backend (Render)
- [ ] API responds: `https://ssgmce-backend.onrender.com/`
- [ ] Logs show "MongoDB Connected"
- [ ] Logs show "Server is ready to accept requests"
- [ ] Environment variables all set

### Frontend (Vercel)
- [ ] Website loads: `https://ssgmce-website.vercel.app`
- [ ] Pages render without errors
- [ ] Console is clean (no CORS errors)

### Integration
- [ ] Frontend can reach backend
- [ ] No CORS errors
- [ ] API calls work
- [ ] Admin features work (if tested)

### GitHub Actions
- [ ] `.github/workflows/deploy.yml` exists
- [ ] Push triggers Actions
- [ ] Auto-deploy works
- [ ] All services update on push

---

## 🎉 DEPLOYMENT COMPLETE!

**Milestone**: Your MERN stack is now LIVE! 🚀

### Your Live URLs:
```
🌐 Frontend:  https://ssgmce-website.vercel.app
🔌 Backend:   https://ssgmce-backend.onrender.com
📊 Database:  MongoDB Atlas
🔄 CI/CD:     GitHub Actions
```

### Costs:
- Frontend: $0/month (forever free)
- Backend: $0/month (forever free)
- Database: $0/month (512MB free tier)
- **Total: $0/month**

### Next Steps (Optional):
1. [ ] Set up custom domain
2. [ ] Enable HTTPS (automatic)
3. [ ] Set up monitoring
4. [ ] Configure email alerts
5. [ ] Schedule database backups
6. [ ] Document API endpoints
7. [ ] Create admin documentation

---

## 📞 Support

If you encounter issues:
1. Check FULL_DEPLOYMENT.md troubleshooting section
2. Check logs in Render/Vercel dashboards
3. Verify all environment variables
4. Ensure MongoDB connection string is correct
5. Check GitHub Actions logs

**Common Issues**:
- CORS errors: Update CORS_ORIGIN in Render
- 502 errors: Check Render logs, verify MongoDB
- Frontend not loading: Check Vercel logs, verify build

---

**Date Completed**: _______________
**Total Time Taken**: _____________
**Status**: ✅ PRODUCTION READY
