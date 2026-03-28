# Data Recovery & Migration Guide

## 📋 Overview

This guide explains how to restore and implement your placement statistics and CSE department data in markdown format.

## ✅ What Was Done

Three new migration/seed scripts have been created to:

1. **Populate Database** with sample placement statistics (2019-2024)
2. **Create Markdown Pages** for:
   - Placements Statistics (5 sections)
   - CSE Department (11 sections)
3. **Make Data Editable** in the admin panel

## 🚀 How to Run

### Step 1: Seed Placement Statistics Data

This populates your PlacementStat collection with sample data for years 2019-24.

```bash
# From project root
node server/scripts/seedPlacementStatistics.js
```

**Output**: Adds 5 years of placement data with:

- Placement percentages
- Average & highest packages
- Total offers
- Department-wise breakdown

---

### Step 2: Sync Placement Statistics Page

This creates markdown sections on the `placements-statistics` page.

```bash
node server/scripts/syncPlacementMarkdownSections.js
```

**Creates 5 sections**:

1. **Placement Overview** - Introduction
2. **Recent Year Summary (2023-24)** - Key metrics table
3. **Department-wise Placement** - CSE, IT, MECH, etc.
4. **Year-wise Placement Statistics** - Full 5-year breakdown
5. **Key Highlights** - Main achievements

---

### Step 3: Sync CSE Department Content

This creates the CSE department page with comprehensive content.

```bash
node server/scripts/syncCSEDepartmentContent.js
```

**Creates 11 sections**:

1. Department Overview
2. Vision & Mission
3. Academic Programs
4. Specialization Areas
5. Laboratory Facilities
6. Placement Statistics (CSE-specific)
7. Faculty Expertise
8. Student Activities & Clubs
9. Departmental Achievements
10. Major Recruiters
11. Department Contact

---

## 📊 Data Structure

### Placement Statistics Format

```
Academic Year | Placement% | Avg Package | Highest Package | Total Offers | Companies
2023-24       | 88%        | ₹8.2 LPA   | ₹24.5 LPA      | 385         | 65+
```

### CSE Placement Specifics

- **2023-24**: 92% placement, ₹9.5 LPA avg, 105 students placed
- **2022-23**: 90% placement, ₹8.8 LPA avg, 98 students placed
- **2021-22**: 88% placement, ₹8.2 LPA avg, 92 students placed
- **2020-21**: 85% placement, ₹7.5 LPA avg, 82 students placed

---

## 🎨 Editing in Admin Panel

After running the scripts:

1. Go to Admin Panel → Page Content Editor
2. Select page: `placements-statistics` or `cse-overview`
3. Click on any section to edit markdown content
4. Use markdown formatting:
   - **Bold**: `**text**`
   - _Italic_: `*text*`
   - Tables: Use markdown table syntax
   - Lists: Use `-` for bullets

---

## 🔄 Customizing the Data

### To update placement numbers:

Edit file: [server/scripts/seedPlacementStatistics.js](server/scripts/seedPlacementStatistics.js)

- Modify the `placementStats` array with your actual data
- Re-run: `node server/scripts/seedPlacementStatistics.js`

### To update CSE content:

Edit file: [server/scripts/syncCSEDepartmentContent.js](server/scripts/syncCSEDepartmentContent.js)

- Modify section content in the `newSections` array
- Re-run: `node server/scripts/syncCSEDepartmentContent.js`

---

## 📁 Created Files

```
server/scripts/
├── seedPlacementStatistics.js          (Database seed)
├── syncPlacementMarkdownSections.js    (Placement stats page)
└── syncCSEDepartmentContent.js         (CSE department page)
```

---

## ✨ Features

✅ All data is in **Markdown format** - fully editable in admin panel
✅ **Department-wise breakdown** for placement statistics
✅ **Year-wise comparison** for tracking progress
✅ **Sample data included** - replace with your actual data
✅ **Responsive formatting** - tables, lists, emphasis
✅ **Easy maintenance** - edit directly from admin UI

---

## 🛠️ Troubleshooting

### Scripts not running?

- Check MongoDB connection: `MONGODB_URI` set in `.env`
- Verify server is not running: `npm stop` (if needed)
- Check Node.js version: `node --version` (v12+)

### Data not appearing?

1. Run scripts from project root: `d:\SSGMCE Website\website\`
2. Allow 2-3 seconds after scripts finish
3. Refresh admin panel or browser cache

### Want to reset data?

The scripts can be run multiple times - they will overwrite previous data.

---

## 📝 Next Steps

1. **Run all 3 scripts** (in order above)
2. **Check admin panel** - verify data appears
3. **Customize content** with your actual data
4. **Update faculty names**, emails, phone numbers
5. **Add department HOD** details
6. **Publish pages** when ready

---

## 📞 Support

For issues or questions about:

- Markdown syntax: See admin panel help
- Data format: Check current page content
- Database issues: Check MongoDB logs
