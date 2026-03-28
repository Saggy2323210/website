# About Section and Admin CMS Updates

This note summarizes the recent updates completed for the About section and related admin behavior.

## Scope Covered

- About dropdown pages redesigned to match the website theme (same visual direction as Placements).
- Professional and minimal layout updates for:
  - SSGMCE At A Glance
  - Vision-Mission, Core Values and Goals
  - Our Inspiration
  - Principal Speaks
  - Organizational Structure
  - Governing Body
  - Board of Directors
  - Various Committees by SGBAU and AICTE
  - Contact Us

## Public View Improvements

- Principal Speaks page redesigned with:
  - Left profile card and highlights
  - Right message content and quote block
  - Read More behavior for long text
- Our Inspiration page redesigned with:
  - Correct title and text hierarchy
  - Founder image placement and responsive sizing
  - Better spacing and compact layout
- Governing Body page updated to support full table rendering and better overflow handling.
- At A Glance page redesigned with:
  - Consistent cards/sections
  - Campus image support
  - Quick Facts section aligned with editable markdown data

## Admin Panel and Editability Fixes

- Preserved markdown editability from admin visual editor for About pages.
- Standardized markdown rendering path to reduce mismatch between admin and public views.
- Fixed Quick Facts behavior so public rendering follows admin markdown structure more closely.
- Adjusted admin page list ordering to match navbar order (serial-wise) for About section.
- Improved About list display in admin with cleaner two-column arrangement.
- Updated "Back to Admin" behavior from visual editor to return to `/admin/pages`.

## Data/Navigation Consistency

- Added ordering metadata support so page ordering can follow configured navigation sequence.
- Reduced duplicate/shuffled appearance by improving dedupe and ordering logic in admin pages list.

## Performance Notes

- Loading delays previously seen were mainly due to:
  - Backend not running or restarting (`ECONNREFUSED 127.0.0.1:5000`)
  - Repeated API retries while frontend is active
  - Large image files and uncached fetches
- Recommended actions:
  - Start backend before frontend
  - Keep optimized/compressed images for About pages
  - Use persistent DB connection and avoid repeated reconnects

## Files Touched During This Workstream

- `client/src/components/GenericContentPage.jsx`
- `client/src/components/GenericPage.jsx`
- `client/src/components/Navbar.jsx`
- `client/src/components/admin/AdminToolbar.jsx`
- `client/src/pages/admin/AdminPages.jsx`
- `client/src/pages/about/*`
- `client/src/constants/navConfig.js`
- `server/controllers/pageContentController.js`
- `server/data/allNavPages.js`
- `server/utils/dbInit.js`
- `server/config/db.js`

## Date

- Updated on: 2026-03-12
