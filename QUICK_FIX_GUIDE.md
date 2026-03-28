# 🔧 Quick Fix Guide (30-45 minutes)

## What You Need to Do

Your project is **95% ready for deployment**. Just 3 quick fixes needed:

---

## Fix #1: CORS Configuration (5 min)

**File**: `server/server.js` (line 13)

**Current:**

```javascript
app.use(cors());
```

**Change to:**

```javascript
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

**Why**: Ensures only your frontend can call the backend API

---

## Fix #2: Vite Proxy (5 min)

**File**: `client/vite.config.js`

**Current:**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

**Change to:**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
```

**Why**: Routes API calls to your backend during local development

---

## Fix #3: Update API Calls (20-30 min)

**Problem**: 136 axios calls scattered in components don't use the API configuration.

**Solution**: Create a central API client (✅ already done!) and update all imports.

### Step 1: Check the API Client

File: `client/src/utils/apiClient.js` ✅ Already created!

### Step 2: Find Files to Update

**Command** (run in project root):

```bash
grep -r "axios\." client/src --include="*.js" --include="*.jsx" | grep -v "apiClient" | head -20
```

**Top Files to Update** (highest priority):

- `client/src/components/admin/DocImportModal.jsx`
- `client/src/components/admin/EditableImage.jsx`
- `client/src/components/admin/MarkdownEditor.jsx`
- `client/src/components/admin/RichTextEditor.jsx`
- `client/src/pages/*` (all page components)

### Step 3: Pattern to Replace

**OLD Pattern** (find):

```javascript
import axios from "axios";

// ... in function
const response = await axios.post("/api/pages/...");
```

**NEW Pattern** (replace with):

```javascript
import apiClient from "../../../utils/apiClient"; // Adjust path

// ... in function
const response = await apiClient.post("/pages/...");
```

### Step 4: VS Code Find & Replace

1. Press `Ctrl+H` (Find & Replace)
2. Enable Regex (click the `.*` button)
3. **Find**: `axios\.(get|post|put|delete|patch)\(`
4. **Replace**: `apiClient.$1(`
5. Click "Replace All"

Then update imports:

1. Press `Ctrl+H` again
2. **Find**: `import axios from 'axios';$`
3. **Replace**: `import apiClient from '../utils/apiClient';` (adjust path as needed)

---

## Step-by-Step Execution

### Command 1: Fix Server CORS

```bash
# Using VS Code, edit server/server.js line 13
# Or use this command to verify:
grep -n "app.use(cors())" server/server.js
```

### Command 2: Fix Vite Config

```bash
# Using VS Code, edit client/vite.config.js
# Verify:
grep -n "proxy" client/vite.config.js
```

### Command 3: Test Locally

```bash
cd server && npm run dev  # Terminal 1
cd client && npm run dev  # Terminal 2 (in new terminal)
```

### Command 4: Check if API calls work

```
1. Open http://localhost:5173 in browser
2. Right-click → Inspect → Console tab
3. Should show: 🔗 Backend URL: http://localhost:5000
4. Open Network tab
5. Trigger any action (click button, submit form, navigate)
6. Should see API requests to /api/*
```

### Command 5: Commit & Push

```bash
git add .
git commit -m "Fix: Centralize API configuration and update CORS"
git push origin main
```

---

## Testing Checklist

- [ ] `npm run dev` starts without errors
- [ ] Browser console shows "🔗 Backend URL: http://localhost:5000"
- [ ] API calls appear in Network tab
- [ ] No 404 or CORS errors in console
- [ ] Admin login/logout works
- [ ] File uploads work
- [ ] Page edits save properly

---

## What NOT to Change

❌ Don't modify:

- Database models (server/models/\*)
- Route structure (server/routes/\*)
- Component layouts
- Authentication logic
- Database initialization

✅ Only change:

- API configuration
- CORS settings
- axios import statements
- axios call patterns

---

## If You Get Stuck

**Issue**: "Cannot find module apiClient"

- **Fix**: Check the import path - it's relative to the file location

**Issue**: "CORS error in browser"

- **Fix**: Make sure CORS config in server.js has correct origin

**Issue**: "API GET works but POST doesn't"

- **Fix**: Make sure Content-Type header is set (apiClient handles this)

---

## After These 3 Fixes → Ready to Deploy!

Once done, follow:

1. **QUICK_START_DEPLOYMENT.md** (7 simple steps, 45 min)
2. Or **DEPLOYMENT_GUIDE.md** (detailed, comprehensive)

---

**Estimated Time**: 30-45 minutes
**Difficulty**: Beginner to Intermediate
**Reversible**: Yes (git can undo)

**Ready?** Start with Fix #1 above! 🚀
