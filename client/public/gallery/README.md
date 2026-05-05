Gallery assets can now be managed in two ways:

1) Admin-managed photo gallery (recommended):
- Open `/admin/gallery` in the admin panel.
- Upload images there (this stores files in backend `/uploads/images/...`).
- Use **Category Manager** on `/admin/gallery` to add/edit/delete/reorder tabs (Campus, Events, etc.).
- Add title/category/order/visibility and save.
- Public `/gallery` page fetches these images from `/api/gallery`.

2) Static fallback assets (used when admin gallery is empty or API is unavailable):
- Photos folder: `/public/gallery/photos`
- Videos folder: `/public/gallery/videos`
- Posters folder: `/public/gallery/posters`

Example static files:
- Photos: `main-building.jpg`, `central-library.jpg`, `computer-lab.jpg`
- Videos: `campus-tour.mp4`, `infrastructure-overview.mp4`
- Posters: `campus-tour.jpg`, `infrastructure-overview.jpg`

Static files are served as:
- `/gallery/photos/<file>`
- `/gallery/videos/<file>`
- `/gallery/posters/<file>`
