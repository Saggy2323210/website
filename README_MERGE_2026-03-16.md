# Merge Summary - 2026-03-16

Purpose: Quick reference for teammates to merge the exact UI/navigation updates done on March 16, 2026.

## Main Changes

1. Homepage redesign updates in `client/src/pages/Home.jsx`
- Redesigned Student's Corner + Prestigious Alumni section.
- Switched Alumni photos to local assets from `client/src/assets/images/home/Alumni/`.
- Reduced size and visual weight for a cleaner minimal look.
- Matched both left and right boxes to the same desktop height.
- Updated CTA routes in "What We Offer":
  - Explore Programs -> `/departments/applied-sciences`
  - Placement Stats -> `/placements/brochure`

2. Social links standardization
- Added `client/src/constants/socialLinks.js` as central source for official links.
- Updated footer links in `client/src/components/Footer.jsx` to use official channels.
- Updated social media page in `client/src/pages/activities/SocialMedia.jsx` to use official links.

3. Leadership data source for homepage
- Added `client/src/data/homeLeadership.js` for Principal + HOD cards used on Home page.

4. Navbar quick-link fixes in `client/src/components/Navbar.jsx`
- Alumni Registration -> `https://alumni.ssgmce.ac.in/`
- ERP Login -> `https://erp.ssgmce.ac.in/login.aspx`
- Both open in a new tab.

## Files to Take If Cherry-Picking Manually

- `client/src/pages/Home.jsx`
- `client/src/components/Navbar.jsx`
- `client/src/components/Footer.jsx`
- `client/src/pages/activities/SocialMedia.jsx`
- `client/src/constants/socialLinks.js`
- `client/src/data/homeLeadership.js`
- `client/src/assets/images/home/Alumni/Abhay_Wagh.jpg`
- `client/src/assets/images/home/Alumni/Ashutosh_Deuskar.jpg`
- `client/src/assets/images/home/Alumni/Nitin-Wankhede.png`
- `client/src/assets/images/home/Alumni/Umesh_Kaul.jpg`

## Validation Done

- Frontend builds passed after edits using `npm run build` in `client`.

## Branch Note

Created for easier merge from branch `gaurav`.
