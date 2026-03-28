# ✅ What's Done | ❌ What's Next

## Status Check

### ✅ Already Complete

- [x] Code pushed to GitHub
- [x] Vite proxy configured (already in vite.config.js)
- [x] apiClient.js created
- [x] GitHub Actions workflow created
- [x] Environment templates created
- [x] Deployment guides created

### ❌ Critical Issues to Fix (Before Deployment)

**Issue #1: CORS Configuration** (5 min)

- File: `server/server.js` line 13
- Current: `app.use(cors())`
- Should be: `app.use(cors({ origin: process.env.CORS_ORIGIN }))`
- Status: **NEEDS FIX NOW**

**Issue #2: Centralize API Calls** (30-45 min)

- Problem: 100+ axios calls scattered across components
- Solution: Use client/src/utils/apiClient.js
- Status: **OPTIONAL FOR NOW** (can work without this, but recommended)

**Issue #3: Test Locally** (10 min)

- Command: `npm run dev`
- Check: Frontend loads, API calls work
- Status: **HIGHLY RECOMMENDED**

---

## 📋 Complete Next-Steps Roadmap

### Step 1: Fix CORS in Backend (5 min) ⚡ DO THIS FIRST

```bash
# Edit server/server.js line 13
Change: app.use(cors());
To:     app.use(cors({ origin: process.env.CORS_ORIGIN }));
```

### Step 2: Test Locally (10 min)

```bash
cd c:/Users/sagar/Downloads/Compressed/website
npm run dev
```

Then visit: `http://localhost:3000`

### Step 3: Set Up MongoDB Atlas (15 min)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (free tier)
4. Create user with credentials
5. Get connection string
6. Create `server/.env`:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=<generate-random-string>
ADMIN_JWT_SECRET=<generate-random-string>
ADMIN_GATE_TOKEN=any-secret-token
CORS_ORIGIN=https://your-frontend.vercel.app (for later)
ADMIN_AUTO_SEED=true
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123
```

### Step 4: Push CORS Fix to GitHub (3 min)

```bash
git add .
git commit -m "fix: Update CORS configuration to use environment variable"
git push origin main
```

### Step 5: Deploy Backend to Render (15 min)

1. Go to: https://render.com
2. Sign up with GitHub
3. New Web Service → Select your repository
4. Configure:
   - Name: `ssgmce-backend`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables from step 3
6. Deploy
7. Copy backend URL (e.g., `https://ssgmce-backend.onrender.com`)

### Step 6: Deploy Frontend to Vercel (10 min)

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Import repository
4. Configure:
   - Root: `client`
   - Build: `npm run build`
   - Output: `dist`
5. Add environment:

```
VITE_BACKEND_URL=https://ssgmce-backend.onrender.com
```

6. Deploy
7. Copy frontend URL (e.g., `https://ssgmce-website.vercel.app`)

### Step 7: Connect Services (5 min)

1. Go to Render backend dashboard
2. Update CORS_ORIGIN to Vercel URL
3. Redeploy

### Step 8: Set Up GitHub Auto-Deployment (5 min)

1. Render dashboard → Settings → Deploy Hook → Copy URL
2. GitHub → Settings → Secrets → New secret
3. Name: `RENDER_DEPLOY_HOOK` → Paste URL
4. Done! Code changes now auto-deploy

---

## 🎯 Recommended Order

| Order | Task                         | Time      | Priority     |
| ----- | ---------------------------- | --------- | ------------ |
| 1️⃣    | Fix CORS in server.js        | 5 min     | 🔴 CRITICAL  |
| 2️⃣    | Test locally (`npm run dev`) | 10 min    | 🟡 IMPORTANT |
| 3️⃣    | Set up MongoDB Atlas         | 15 min    | 🔴 CRITICAL  |
| 4️⃣    | Push code to GitHub          | 3 min     | 🟡 IMPORTANT |
| 5️⃣    | Deploy to Render             | 15 min    | 🟢 NEXT      |
| 6️⃣    | Deploy to Vercel             | 10 min    | 🟢 NEXT      |
| 7️⃣    | Connect services             | 5 min     | 🟡 IMPORTANT |
| 8️⃣    | GitHub automation            | 5 min     | 🟢 OPTIONAL  |
| \*️⃣   | Centralize API calls         | 30-45 min | 🟢 OPTIONAL  |

**Total Time: ~60-90 minutes** (including optional steps)

---

## 🚀 Quick Start Now

Ready to start? Here's the first command:

```bash
# 1. Fix CORS (I'll do this for you)
# 2. Test locally
npm run dev

# 3. Then follow the deployment steps above
```

**Which do you want me to do first?**

1. ✅ Fix CORS automatically
2. ✅ Fix CORS + Test locally
3. ✅ Do everything step by step with you
