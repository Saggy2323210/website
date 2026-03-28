# 🎯 Complete Deployment Guide - Full Setup (2 Hours)

## Prerequisites Check ✅

- [x] Code pushed to GitHub: https://github.com/Saggy2323210/website
- [x] CORS fixed in server.js
- [x] Frontend builds successfully
- [x] Backend dependencies ready
- [x] GitHub Actions configured

---

## Phase 1: MongoDB Atlas Setup (15 minutes)

### Step 1.1: Create MongoDB Atlas Account

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Click**: "Sign Up" (top right)
3. **Choose**: "Create one for free"
4. **Fill details**:
   - Email: Your email
   - Password: Strong password
   - First & Last Name: Your name
5. **Accept terms** → Click "Create account"
6. **Verify email** from MongoDB

### Step 1.2: Create Database Cluster

1. **After login**, click **"Create"** (green button)
2. **Choose**: "M0" (Free tier) - should be pre-selected
3. **Click**: "Create Deployment"
4. **Choose provider**:
   - Provider: AWS (or closest to you)
   - Region: Free tier region (recommended)
   - Click "Create"
5. **Wait** 2-3 minutes for cluster to be ready
6. **You'll see**: "SSGMCE_cluster-0" created

### Step 1.3: Create Database User

1. **Go to**: "Database Access" (left menu)
2. **Click**: "Add New Database User"
3. **Fill**:
   - **Username**: `ssgmce_user`
   - **Password**: Generate secure (copy it!)
   - **Built-in roles**: "Atlas admin"
4. **Click**: "Add User"

### Step 1.4: Get Connection String

1. **Go to**: "Clusters" (left menu)
2. **Click**: Connect button on your cluster
3. **Choose**: "Connect your application"
4. **Select**: "Node.js" + Version "5.5 or later"
5. **Copy** the connection string (looks like):
   ```
   mongodb+srv://ssgmce_user:<password>@cluster0.xxxxx.mongodb.net/ssgmce?retryWrites=true&w=majority
   ```
6. **Replace** `<password>` with the password you generated
7. **Replace** `ssgmce` with your desired database name
8. **Save it safely** - you'll need it soon

### Step 1.5: Whitelist IP Address (Allow All for Testing)

1. **Go to**: "Database Access" → "Network Access" (left menu)
2. **Click**: "Add IP Address"
3. **Choose**: "Allow access from anywhere" (0.0.0.0/0)
4. **Confirm**: Click "Confirm"
   ⚠️ _For production, restrict to specific IPs later_

---

## Phase 2: Create Environment File (5 minutes)

### Step 2.1: Create `server/.env` File

Copy this template and fill in your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Connection (from Step 1.4)
MONGODB_URI=mongodb+srv://ssgmce_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ssgmce?retryWrites=true&w=majority

# JWT Secrets (generate random strings at: https://generate-random.org/)
JWT_SECRET=your_random_jwt_secret_here_32_chars_minimum
ADMIN_JWT_SECRET=another_random_admin_jwt_secret_here

# Admin Gate Token (any random string)
ADMIN_GATE_TOKEN=super_secret_gate_token_12345

# Cors Origin (UPDATE AFTER FRONTEND DEPLOYMENT)
CORS_ORIGIN=https://ssgmce-website.vercel.app

# Auto-seed pages on startup
ADMIN_AUTO_SEED=true

# Default Admin Account
ADMIN_EMAIL=admin@ssgmce.edu.in
ADMIN_PASSWORD=Admin@12345Secure
ADMIN_NAME=Admin
```

**Save this file as**: `server/.env`

**⚠️ DO NOT COMMIT THIS FILE** (it's in .gitignore)

---

## Phase 3: Deploy Backend to Render (20 minutes)

### Step 3.1: Create Render Account

1. **Go to**: https://render.com
2. **Click**: "Sign up"
3. **Choose**: "Continue with GitHub"
4. **Authorize** Render to access your GitHub
5. **Fill details**: Name, email
6. **Verify email**

### Step 3.2: Create Web Service

1. **After login**, click **"New +"** (top left)
2. **Select**: "Web Service"
3. **Select your repo**: `website` from dropdown
4. **Connect** your GitHub account

### Step 3.3: Configure Service

Fill in these settings:

| Field          | Value                 |
| -------------- | --------------------- |
| Name           | `ssgmce-backend`      |
| Runtime        | `Node`                |
| Root Directory | `server`              |
| Build Command  | `npm install`         |
| Start Command  | `npm start`           |
| Region         | Choose closest to you |

### Step 3.4: Add Environment Variables

1. **Scroll down** to "Environment" section
2. **Click**: "Add Environment Variable"
3. **Add each** from your `.env` file:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://ssgmce_user:PASSWORD@cluster0.xxxxx.mongodb.net/ssgmce?retryWrites=true&w=majority
JWT_SECRET=your_secret_here
ADMIN_JWT_SECRET=your_admin_secret_here
ADMIN_GATE_TOKEN=your_gate_token
CORS_ORIGIN=http://localhost:3000
ADMIN_AUTO_SEED=true
ADMIN_EMAIL=admin@ssgmce.edu.in
ADMIN_PASSWORD=Admin@12345Secure
ADMIN_NAME=Admin
```

⚠️ **CORS_ORIGIN**: Update later after Vercel deployment

### Step 3.5: Deploy

1. **Click**: "Create Web Service"
2. **Wait** 5-10 minutes for deployment
3. **Check**: Green checkmark = success ✅
4. **Copy your URL**: `https://ssgmce-backend.onrender.com`
5. **Test**: Open URL + `/` in browser
   - Should see: `{"message":"SSGMCE API Server Running"}`

---

## Phase 4: Deploy Frontend to Vercel (15 minutes)

### Step 4.1: Create Vercel Account

1. **Go to**: https://vercel.com
2. **Click**: "Sign up"
3. **Choose**: "Continue with GitHub"
4. **Authorize** Vercel
5. **Verify email**

### Step 4.2: Import Project

1. **After login**, click **"Add New..."** (top)
2. **Select**: "Project"
3. **Choose repo**: `Saggy2323210/website`
4. **Click**: "Import"

### Step 4.3: Configure Project

1. **Framework**: Select "Vite"
2. **Root Directory**: Change to `client`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   ```
   VITE_BACKEND_URL=https://ssgmce-backend.onrender.com
   ```
6. **Click**: "Deploy"

### Step 4.4: Wait for Deployment

1. **Watch** the build process
2. **Wait** 3-5 minutes
3. **Success** = Blue "Visit" button appears
4. **Copy your URL**: `https://ssgmce-website.vercel.app`
5. **Click**: "Visit" to test

---

## Phase 5: Update CORS & Test Connection (5 minutes)

### Step 5.1: Update Render Backend CORS

1. **Go to**: https://dashboard.render.com
2. **Select**: `ssgmce-backend` service
3. **Go to**: "Environment" tab
4. **Update**: `CORS_ORIGIN`
   ```
   CORS_ORIGIN=https://ssgmce-website.vercel.app
   ```
5. **Click**: "Save"
6. **Auto-redeploy** happens (watch status)

### Step 5.2: Test Connection

1. **Go to**: https://ssgmce-website.vercel.app
2. **Open**: Browser DevTools (F12)
3. **Check**: Console tab - should NOT show CORS errors
4. **Try**: Any page that fetches data
5. **Verify**: No API errors

---

## Phase 6: GitHub Secrets for Auto-Deployment (5 minutes)

### Step 6.1: Get Render Deploy Hook

1. **Go to**: https://dashboard.render.com
2. **Select**: `ssgmce-backend`
3. **Go to**: "Settings" tab
4. **Find**: "Deploy Hook"
5. **Scroll down** and copy the webhook URL
   ```
   https://api.render.com/deploy/srv-...
   ```

### Step 6.2: Add Secret to GitHub

1. **Go to**: https://github.com/Saggy2323210/website
2. **Click**: Settings tab
3. **Left menu**: "Secrets and variables" → "Actions"
4. **Click**: "New repository secret"
5. **Name**: `RENDER_DEPLOY_HOOK`
6. **Value**: Paste the webhook URL
7. **Click**: "Add secret"

### Step 6.3: Test Auto-Deployment

1. **Go to**: GitHub repo
2. **Make a small change** (e.g., update README)
3. **Commit**: `git add . && git commit -m "test: CI/CD trigger"`
4. **Push**: `git push origin main`
5. **Check** 3 places:
   - GitHub Actions tab → workflow running
   - Render dashboard → backend redeploying
   - Vercel → frontend auto-rebuilding

---

## 🎯 Verification Checklist

### ✅ MongoDB

- [ ] Cluster created
- [ ] User created with username/password
- [ ] Connection string copied
- [ ] IP whitelisted (0.0.0.0/0)

### ✅ Backend (Render)

- [ ] Service deployed successfully
- [ ] Environment variables added
- [ ] Health check passes: `https://ssgmce-backend.onrender.com/`
- [ ] Can see: `"SSGMCE API Server Running"`

### ✅ Frontend (Vercel)

- [ ] Project deployed successfully
- [ ] Environment variables added
- [ ] Website loads: `https://ssgmce-website.vercel.app`
- [ ] No CORS errors in console

### ✅ Connection

- [ ] Frontend can reach backend (no CORS errors)
- [ ] Backend has correct CORS_ORIGIN
- [ ] API calls work from frontend

### ✅ GitHub Automation

- [ ] `RENDER_DEPLOY_HOOK` secret added
- [ ] Push triggers GitHub Actions
- [ ] Render auto-deploys
- [ ] Vercel auto-deploys

---

## 🚀 Summary

| Service      | URL                                     | Status         |
| ------------ | --------------------------------------- | -------------- |
| **MongoDB**  | https://cloud.mongodb.com               | ✅ Up          |
| **Backend**  | https://ssgmce-backend.onrender.com     | ✅ Running     |
| **Frontend** | https://ssgmce-website.vercel.app       | ✅ Live        |
| **GitHub**   | https://github.com/Saggy2323210/website | ✅ Auto-deploy |

---

## 📋 Post-Deployment Tasks

- [ ] Test all admin features
- [ ] Verify database persistence
- [ ] Check error logs
- [ ] Set up monitoring (optional)
- [ ] Custom domain (optional)
- [ ] Database backups (optional)

---

## 🆘 Troubleshooting

### CORS Errors in Browser

```
Solution: Check CORS_ORIGIN in Render matches your Vercel URL
```

### Backend not responding

```
Solution: Check Render logs, ensure MongoDB URI is correct
```

### Frontend builds fail

```
Solution: Check Vercel logs, ensure VITE_BACKEND_URL is set
```

### Database connection fails

```
Solution: Check MongoDB IP whitelist, verify connection string
```

---

**Your site is now LIVE! 🎉**
Date: March 28, 2026
Total Time: ~60 minutes
Cost: **$0** (completely free)
