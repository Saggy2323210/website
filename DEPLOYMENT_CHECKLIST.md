# 🚀 MERN Deployment Checklist

Use this checklist to track your deployment progress.

## Phase 1: Preparation ✅

- [ ] Read DEPLOYMENT_GUIDE.md completely
- [ ] Initialize Git repository (if needed)
- [ ] Update root package.json
- [ ] Verify .gitignore is proper
- [ ] Test local development (`npm run dev`)

## Phase 2: Database Setup

- [ ] Create MongoDB Atlas account
- [ ] Create a free tier cluster
- [ ] Create database user with credentials
- [ ] Whitelist IP addresses (0.0.0.0/0 for testing)
- [ ] Copy MongoDB connection string
- [ ] Test connection locally

## Phase 3: GitHub

- [ ] Create GitHub repository
- [ ] Initialize Git locally
- [ ] Add remote: `git remote add origin <repo-url>`
- [ ] Push code: `git push -u origin main`
- [ ] Verify all files are uploaded

## Phase 4: Backend Deployment (Render)

- [ ] Create Render account with GitHub
- [ ] Create new Web Service
- [ ] Select GitHub repository
- [ ] Set Root Directory to `server`
- [ ] Add all environment variables
- [ ] Deploy and note backend URL
- [ ] Test API endpoint with curl/Postman
- [ ] Copy Render deployment webhook URL
- [ ] Database auto-seeds (if configured)

## Phase 5: Frontend Deployment (Vercel)

- [ ] Create Vercel account with GitHub
- [ ] Import GitHub repository
- [ ] Set Root Directory to `client`
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `dist`
- [ ] Add environment variable: VITE_BACKEND_URL
- [ ] Deploy and note frontend URL
- [ ] Test frontend in browser
- [ ] Verify API connectivity

## Phase 6: Connect Backend & Frontend

- [ ] Update Render CORS_ORIGIN with Vercel URL
- [ ] Update Vercel VITE_BACKEND_URL with Render URL
- [ ] Redeploy both services
- [ ] Test backend ↔ frontend communication

## Phase 7: GitHub Actions CI/CD

- [ ] Verify `.github/workflows/deploy.yml` exists
- [ ] Go to GitHub Settings → Secrets and variables
- [ ] Add secret: `RENDER_DEPLOY_HOOK` with webhook URL
- [ ] Add secret: `VITE_BACKEND_URL` (or keep in Vercel)
- [ ] Push a test commit to trigger workflow
- [ ] Verify Actions tab shows successful run
- [ ] Verify services auto-deployed

## Phase 8: Testing

- [ ] Test frontend loads: https://your-frontend.vercel.app
- [ ] Test backend API: curl https://your-backend.onrender.com/api/health
- [ ] Test form submissions
- [ ] Test file uploads
- [ ] Test authentication (if applicable)
- [ ] Test database CRUD operations
- [ ] Test on mobile devices
- [ ] Check browser console for errors

## Phase 9: Production Readiness

- [ ] Review and update admin credentials
- [ ] Disable ADMIN_AUTO_SEED in production
- [ ] Enable HTTPS everywhere
- [ ] Set up error logging
- [ ] Configure monitoring alerts
- [ ] Document API endpoints
- [ ] Create backup strategy for MongoDB
- [ ] Set up custom domains (optional)

## Phase 10: Maintenance

- [ ] Monitor Render logs regularly
- [ ] Check Vercel deployment status
- [ ] Monitor MongoDB Atlas usage
- [ ] Update dependencies monthly
- [ ] Backup database regularly
- [ ] Review GitHub Actions logs
- [ ] Plan scaling strategy if needed

---

## Quick Commands Reference

### Local Development

```bash
npm run dev  # Starts both frontend and backend
```

### Deploy Manually

```bash
git add .
git commit -m "Your message"
git push origin main  # Triggers CI/CD automatically
```

### Useful Links

- 🔗 GitHub: https://github.com/YOUR_USERNAME/ssgmce-website
- 🔗 Vercel Dashboard: https://vercel.com/dashboard
- 🔗 Render Dashboard: https://dashboard.render.com
- 🔗 MongoDB Atlas: https://cloud.mongodb.com
- 🔗 GitHub Actions: https://github.com/YOUR_USERNAME/ssgmce-website/actions

---

## Estimated Timeline

- Phase 1-3: 10 minutes
- Phase 4: 10 minutes (waiting for Render)
- Phase 5: 10 minutes (waiting for Vercel)
- Phase 6: 5 minutes
- Phase 7: 5 minutes
- Phase 8: 15 minutes (testing)
- **Total: 45-60 minutes**

---

## Problem Solver

### If nothing works:

1. Check error logs (Render, Vercel, GitHub Actions)
2. Verify all environment variables
3. Ensure MongoDB connection string is correct
4. Check CORS settings
5. Review API endpoints match frontend calls

### Need Help?

- Render Support: https://render.com/support
- Vercel Support: https://vercel.com/support
- MongoDB Docs: https://docs.mongodb.com
- GitHub Actions: https://docs.github.com/en/actions

---

**Status**: Not Started
**Last Updated**: 2026-03-28
