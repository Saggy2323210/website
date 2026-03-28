# PLACEMENTS MARKDOWN EDITING - COMPLETE IMPLEMENTATION ANALYSIS

## 1. CLIENT-SIDE PAGE COMPONENTS

### Pages Location: `client/src/pages/placements/`

**All Pages use GenericContentPage wrapper:**

- [AboutTP.jsx](../../client/src/pages/placements/AboutTP.jsx) - `<GenericContentPage pageId="placements-about" />`
- [Objectives.jsx](../../client/src/pages/placements/Objectives.jsx) - `pageId="placements-objectives"`
- [Goals.jsx](../../client/src/pages/placements/Goals.jsx) - `pageId="placements-goals"`
- [Coordinators.jsx](../../client/src/pages/placements/Coordinators.jsx) - `pageId="placements-coordinators"`
- [Activities.jsx](../../client/src/pages/placements/Activities.jsx) - `pageId="placements-activities"`
- [PlacementBrochure.jsx](../../client/src/pages/placements/PlacementBrochure.jsx) - `pageId="placements-brochure"`
- PlacementStats, CareerGuidance, Internship, etc. - All same pattern

### Sidebar Navigation: [PlacementSidebar.jsx](../../client/src/components/PlacementSidebar.jsx)

- **Path**: `client/src/components/PlacementSidebar.jsx`
- **Key Features**:
  - 11 placement pages defined in `links` array (line 7-17)
  - Function `pathToPageId()`: `/placements/about` → `placements-about`
  - Click-to-edit: When `isEditing=true`, redirects to `/admin/visual/{pageId}`
  - Renders section subsections when active (lines 69-76)
  - Uses `useEdit()` hook to check `isEditing` state

## 2. MARKDOWN EDITOR COMPONENTS

### Primary: [GenericContentPage.jsx](../../client/src/components/GenericContentPage.jsx) (1900+ lines)

- **Purpose**: Universal page renderer with markdown support
- **Sections rendering** (lines 302-370):
  ```jsx
  {
    section.type === "markdown" && (
      <MarkdownEditor
        value={section.content.text}
        path={`sections[${index}].content.text`}
        className={isAdmissionsThemePage ? "leading-7" : ""}
      />
    );
  }
  ```
- **Section Wrapper**: `<EditableSection>` detects clicks in edit mode
- **Sidebar Map** (lines 28-39): Maps pageId prefixes to sidebar components (e.g., `"placements-"` → `PlacementSidebar`)

### Specialized Editor: [PlacementMarkdownEditor.jsx](../../client/src/components/admin/PlacementMarkdownEditor.jsx) (320+ lines)

- **Purpose**: Lightweight markdown editor with preview, toolbar, custom HTML parser (NOT React-Markdown)
- **NOT USED** in GenericContentPage - for placements-specific use only
- **Parser**: `parseMarkdownToHtml()` - custom inline/block markdown parser
- **Features**:
  - Split-pane editor: textarea + live preview (toggleable with eye icon)
  - Toolbar: heading levels, bold, italic, lists, tables, code blocks, images, links, alignment, blockquotes
  - Image insertion dialog with size/alignment options
  - Callouts: `::: info`, `::: warning`, `::: danger`, `::: tip`
  - Alignment containers: `:::left`, `:::center`, `:::right`
  - No dependency on external markdown libraries

### General Editor: [MarkdownEditor.jsx](../../client/src/components/admin/MarkdownEditor.jsx) (1900+ lines)

- **Purpose**: Production markdown editor used by GenericContentPage
- **Libraries**: React-Markdown, rehype-raw, remark-gfm, markdown-it, markdown-it-attrs
- **Components**: MD_COMPONENTS object (lines 1348+) for custom rendering
- **Toolbar**: Multiple heading levels, formatting, lists, tables, code blocks, images with size/alignment
- **ImageInsertDialog**: Size (25/50/75/100%), alignment (left/center/right)
- **Callouts**: Support for info, warning, danger, tip blocks
- **Advanced**: Facility grid parsing, research scholar tables, document cards
- **Used by**: GenericContentPage sections with `type: "markdown"`

## 3. EDIT CONTEXT & STATE MANAGEMENT

### [EditContext.jsx](../../client/src/contexts/EditContext.jsx) (150+ lines)

**Provider wraps editing experience:**

```jsx
export const EditProvider = ({ children, pageId, initialData = {} })
```

**Key Methods:**

- `updateData(path, value)` - Dot notation updates: `updateData('sections[0].content.text', newMarkdown)`
- `saveData()` - PUT `/api/pages/{pageId}` with full data object
- `addSection(section)` - Append new markdown section
- `removeSection(index)` - Delete section by index
- History tracking with undo capability

**Hook:**

- `useEdit()` - Returns `{ isEditing, data, updateData, saveData, addSection, removeSection, canUndo, undo }`
- Safe fallback when not in EditProvider (returns `isEditing: false`)

## 4. ADMIN UI INTEGRATION

### [VisualPageEditor.jsx](../../client/src/pages/admin/VisualPageEditor.jsx) (200+ lines)

- **Route**: `/admin/visual/:pageId`
- **Coordinator Access**: DEPT_TO_PAGEID map restricts coordinators to their department page
- **Flow**:
  1. Fetch page via `GET /api/pages/{pageId}`
  2. Wrap in `<EditProvider pageId={pageId} initialData={fetchedData}>`
  3. Renders appropriate page component (GenericContentPage, Departments, NIRF, etc.)
  4. AdminToolbar overlays with Save/Cancel buttons

### [AdminToolbar.jsx](../../client/src/components/admin/AdminToolbar.jsx)

- Save button calls `EditContext.saveData()`
- Shows unsaved changes indicator
- Floating position for visibility

## 5. DATA MODEL & STORAGE

### [PageContent.js Model](../../server/models/PageContent.js) (60+ lines)

**Flexible nested section schema:**

```javascript
sectionSchema = {
  sectionId: String (required),
  title: String,
  type: String (enum: text, richtext, markdown, image, stats, etc.),
  order: Number,
  isVisible: Boolean,
  content: Mixed (flexible based on type)
}
```

For markdown sections:

```javascript
content: {
  text: "[markdown string]";
}
```

Placements data (PlacementStat):

- Separate model for placement statistics (academicYear, percentages, offers, etc.)
- NOT markdown-based

### [allNavPages.js](../../server/data/allNavPages.js) (lines 1624-1737)

**Placements Pages Array:**

```javascript
const placementsPages = [
  {
    pageId: "placements-about",
    pageTitle: "About Training & Placement Cell",
    route: "/placements/about",
    category: "placements",
    template: "generic",
    isPublished: true,
    sections: [], // ← Empty: populated by editors or seed scripts
  },
  // ... 11 total pages
];
```

## 6. SERVER ROUTES & CONTROLLERS

### [pageContentRoutes.js](../../server/routes/pageContentRoutes.js) (33 lines)

```
GET    /api/pages                 - getAllPages (public)
GET    /api/pages/:pageId         - getPageById (public)
POST   /api/pages                 - createPage (admin)
PUT    /api/pages/:pageId         - updatePage (admin or coordinator)
DELETE /api/pages/:pageId         - deletePage (admin)
POST   /api/pages/seed-all        - seedAllNavPages (admin)
POST   /api/pages/reset/:logId    - resetPageToVersion (admin)
```

### [pageContentController.js](../../server/controllers/pageContentController.js)

- `getPageById(pageId)` - Returns full PageContent with sections
- `updatePage(pageId, data)` - Merges top-level fields + sections array
- `seedAllNavPages()` - Upserts ALL pages from allNavPages.js

## 7. CLICK-TO-EDIT PATTERN

**Public View → Admin Edit Flow:**

1. User views placements page (e.g., `/placements/about`)
2. GenericContentPage component renders sections from API
3. In browser console/admin mode: `editMode=true` or auth token present
4. Sidebar links change: `onClick={() => navigate('/admin/visual/placements-about')}`
5. VisualPageEditor loads `/api/pages/placements-about`
6. EditProvider wraps with `initialData` from API
7. GenericContentPage re-renders with edit controls visible
8. Editing markdown via MarkdownEditor (textarea + split preview)
9. Save via AdminToolbar → EditContext.saveData() → PUT /api/pages/placements-about
10. Server merges updates into PageContent.sections[].content

## 8. KEY MARKDOWN RENDERING COMPONENTS

### In GenericContentPage (lines 1348+):

**MD_COMPONENTS** - ReactMarkdown custom renderers:

- `h1-h6` - Tailwind styled headings
- `p` - Paragraphs with leading/margins
- `ul/ol` - Lists with special handling for report/image links
- `blockquote` - Orange left border, italic styling
- `code` - Inline + code blocks (syntax highlight supports)
- `a` - External links with icon
- `table` - Grid layout with alternating rows
- `img` - Responsive with size/alignment from markdown-it-attrs
- `div` - Alignment containers (`::: left/center/right/justify`)
- Callout containers (`::: info/warning/danger/tip`)

### Advanced Parsing Functions:

- `parseFacilityGridMarkdown()` - Extract 2+ facilities from markdown
- `parseResearchScholarMarkdown()` - Parse numbered scholar records with fields
- `parseDocumentCardItems()` - Extract bullet lists as cards
- `splitByH2Sections()` - Divide content by ## headers
- `parseNumberedEntries()` - Extract numbered lists with metadata

## CRITICAL PATTERNS FOR PLACEMENTS

**How markdown content flows:**

1. **Definition** → `allNavPages.js`: `placementsPages[0].sections = []`
2. **Storage** → Database `PageContent.sections[].type = "markdown"`
3. **Editor** → GenericContentPage + MarkdownEditor (in admin UI)
4. **Rendering** → GenericContentPage renders as ReactMarkdown with MD_COMPONENTS
5. **Click-to-Edit** → PlacementSidebar `isEditing=true` navigates to `/admin/visual/{pageId}`

**Data Update Path:**

- `MarkdownEditor` textarea → `updateData('sections[0].content.text', markdown)`
- EditContext syncs to state
- `AdminToolbar Save` → `EditContext.saveData()`
- PUT `/api/pages/placements-about` with full page data
- Server upserts PageContent document with merged sections
