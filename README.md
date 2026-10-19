# Mane Sahradyan — Portfolio

Static portfolio site (HTML, CSS, JavaScript — no build step). Deployed on Vercel.

## Structure

- `index.html` — home page: intro and project list; hovering a project shows its works on the left.
- `project.html` — project page, opened as `project.html?id=<project-id>`.
- `js/data.js` — **all site content**: name, e-mail, CV link, projects, texts, images, preview layouts and colors.
- `js/sizes.js` — pixel sizes of all images (generated, see below).
- `js/home.js`, `js/project.js` — page logic.
- `css/style.css` — styles.
- `assets/` — images, videos and `cv.pdf`.

## Updating content

1. Put new images or videos into `assets/<folder>/`.
2. Add or edit the project in `js/data.js`.
3. Regenerate image sizes (Windows PowerShell, from the repository root):

   ```
   powershell -ExecutionPolicy Bypass -File tools/make-sizes.ps1
   ```

4. Commit and push — Vercel redeploys automatically.

Videos should be H.264 MP4 (HEVC does not play in every browser).
