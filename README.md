# JC_foods — Frontend in `docs/` and backend in `server/`

This workspace contains a minimal starter scaffold:

- `docs/` — static frontend (can be used for GitHub Pages)
- `server/` — Node/Express backend with example API endpoints

Quick start:

1. Install server deps

```powershell
cd server
npm install
```

2. Run server

```powershell
npm start
```

3. Open `http://localhost:3000/` to view the frontend and `http://localhost:3000/api/health` for API.

Next steps:

-- Provide the `Frontend design plan.docx` in this workspace (place in `docs/` or upload) so I can import and convert it.
-- Tell me whether you want the frontend implemented as React/Vue or plain static files.

Convert a DOCX design plan into HTML/text/tasks:

1. From the workspace root, install server deps:

```powershell
cd server
npm install
```

2. Run the converter (replace the path with your DOCX):

```powershell
node tools/convert-docx.js "C:\\Users\\User\\Downloads\\Frontend design plan.docx"
```

Outputs will be written to `docs/plan.html`, `docs/plan.txt`, and `docs/plan_tasks.json`.
