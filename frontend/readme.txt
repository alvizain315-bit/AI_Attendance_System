================================================================================
  AUTOMATIC ATTENDANCE SYSTEM - WINDOWS 11 x64 SETUP GUIDE
================================================================================

Project Type : TanStack Start v1 (React 19 + TypeScript + Vite + Tailwind CSS v4)
Target OS    : Windows 11 64-bit (x64)

--------------------------------------------------------------------------------
  IMPORTANT NOTE ABOUT main.tsx / main.html
--------------------------------------------------------------------------------

This project does NOT contain a traditional Vite "main.tsx" or root "index.html".
That is NORMAL for TanStack Start. The framework generates the entry points
automatically from these files:

  src/router.tsx          --> app router setup
  src/routes/__root.tsx   --> root layout (HTML shell, meta tags, providers)
  src/routes/index.tsx    --> home page
  src/start.ts            --> server/bootstrap file

So you do NOT need to create main.tsx or index.html to run this project locally.

--------------------------------------------------------------------------------
  COMPATIBLE RUNTIME OPTIONS FOR WINDOWS 11 x64
--------------------------------------------------------------------------------

Option A (Recommended for maximum compatibility): Node.js + npm
  - Download Node.js LTS from https://nodejs.org/
  - Windows 11 x64 is fully supported.
  - npm comes bundled with Node.js.
  - This works exactly like any standard React/Vite project on Windows.

Option B (Fastest install, newer): Bun
  - Download Bun for Windows from https://bun.sh/
  - Bun has native Windows x64 support (Bun 1.1+).
  - The project already has a bun.lock file, so dependencies will install exactly as intended.
  - Note: Bun on Windows is still improving; if you hit any issue, switch to Node.js/npm.

--------------------------------------------------------------------------------
  REQUIRED INSTALLATIONS
--------------------------------------------------------------------------------

1. Git for Windows (to clone / unzip is not needed if you already have the zip)
   - URL: https://git-scm.com/download/win
   - Needed only if you want to clone the repository. If you have the zip file,
     you can skip Git.

2. A JavaScript runtime (choose ONE of the two below)

   A) Node.js (Recommended)
      - URL: https://nodejs.org/en/download
      - Install the LTS version (e.g., Node.js 20.x or 22.x).
      - Verify after install by opening PowerShell / Command Prompt and running:
          node -v
          npm -v

   B) Bun
      - URL: https://bun.sh/
      - Run in PowerShell (as Administrator):
          powershell -c "irm bun.sh/install.ps1 | iex"
      - Verify after install:
          bun -v

3. A code editor (optional but recommended)
   - Visual Studio Code: https://code.visualstudio.com/

4. A modern web browser
   - Google Chrome, Microsoft Edge, or Firefox.

--------------------------------------------------------------------------------
  HOW TO RUN THE PROJECT LOCALLY
--------------------------------------------------------------------------------

Step 1: Extract the project zip
  - Right-click the zip file -> "Extract All..."
  - Choose a folder such as C:\Users\YourName\Projects\automatic-attendance-system
  - Open the extracted folder.

Step 2: Open a terminal in the project folder
  - In File Explorer, click the address bar, type cmd, and press Enter.
  - OR right-click in the folder and choose "Open in Terminal" (Windows 11).

Step 3: Install dependencies

  If using Node.js / npm:
    npm install

  If using Bun:
    bun install

  This will create a node_modules folder and may take a few minutes.

Step 4: Start the development server

  If using Node.js / npm:
    npm run dev

  If using Bun:
    bun run dev

  You should see a message like:
    VITE v7.x  ready in xxx ms
    Local:   http://localhost:3000/

Step 5: Open the app in your browser
  - Go to http://localhost:3000/
  - The home page (Automatic Attendance System) should appear.

--------------------------------------------------------------------------------
  HOW TO BUILD FOR PRODUCTION
--------------------------------------------------------------------------------

  Using Node.js / npm:
    npm run build

  Using Bun:
    bun run build

  The built files will be placed in the dist/ folder.

  To preview the production build locally:
    npm run preview
    or
    bun run preview

--------------------------------------------------------------------------------
  AVAILABLE SCRIPTS
--------------------------------------------------------------------------------

  npm run dev         --> Start the development server
  npm run build       --> Build for production
  npm run build:dev   --> Build for development mode
  npm run preview     --> Preview the production build
  npm run lint        --> Run ESLint
  npm run format      --> Format code with Prettier

--------------------------------------------------------------------------------
  PROJECT STRUCTURE (KEY FOLDERS)
--------------------------------------------------------------------------------

  src/
    routes/           --> All page routes (TanStack Start file-based routing)
      index.tsx       --> Home / landing page
      login.tsx       --> Login page (Admin / Teacher)
      admin*.tsx      --> Admin dashboard pages
      teacher*.tsx    --> Teacher dashboard pages
    components/       --> Reusable UI components
    lib/              --> Utility functions, mock data, API helpers
    assets/           --> Images and static assets
    styles.css        --> Global styles and Tailwind CSS theme
    router.tsx        --> Router configuration
    start.ts          --> Server/bootstrap entry
    server.ts         --> SSR error wrapper

  vite.config.ts      --> Vite + TanStack Start configuration
  package.json        --> Dependencies and scripts
  bun.lock            --> Bun lockfile (safe to ignore if using npm)

--------------------------------------------------------------------------------
  TROUBLESHOOTING
--------------------------------------------------------------------------------

1. "'vite' is not recognized as an internal or external command"
   - Dependencies are not installed. Run "npm install" first.

2. Port already in use
   - The default port is usually 3000. If another app uses it, Vite will
     automatically suggest a different port (e.g., 3001). Check the terminal output.

3. Error about missing main.tsx / main.html
   - This is expected for TanStack Start. Do not create those files.
   - Just run "npm run dev" and open http://localhost:3000/

4. PowerShell script execution policy blocks Bun install
   - Run PowerShell as Administrator and execute:
       Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   - Then retry the Bun install command.

5. Bun install fails or behaves unexpectedly on Windows
   - Switch to Node.js + npm:
       npm install
       npm run dev

--------------------------------------------------------------------------------
  QUICK START CHECKLIST
--------------------------------------------------------------------------------

  [ ] Install Node.js LTS from https://nodejs.org/ (recommended)
  [ ] Extract the project zip file
  [ ] Open terminal in the project folder
  [ ] Run: npm install
  [ ] Run: npm run dev
  [ ] Open http://localhost:3000/ in your browser

================================================================================
  End of README
================================================================================
