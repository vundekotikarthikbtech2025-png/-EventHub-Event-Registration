# EventHub — Event Registration Management System

## Run the project
1. Extract `ERMS_Semester_Project.zip`.
2. Open the extracted `ERMS_Semester_Project` folder in Visual Studio Code.
3. Open `index.html`.
4. Right-click `index.html` and choose **Open with Live Server** (if the Live Server extension is installed), or double-click `index.html` to open it in Chrome/Edge.
5. Use the **Admin Login** button to open the demo admin panel.

## Demo admin credentials
- Username: `admin`
- Password: `admin123`

These credentials are visible in client-side JavaScript and are for classroom demonstration only. This is not secure authentication.

## Features
- Responsive event listing, search and category filter
- Registration form with validation and duplicate-registration prevention
- Capacity tracking
- User registration list and cancellation
- Demo admin login/logout
- Admin event CRUD (create, read, update, delete)
- Participant management and CSV export
- Browser localStorage persistence

## Data storage
The project uses `localStorage`; it has no SQL database. Data stays in the browser profile where it was entered. Clearing browser site data or using another browser/device may remove or hide the data. There is no real server, AJAX endpoint, secure session, or multi-user synchronization.

## Files
- `index.html` — page structure and forms
- `styles.css` — layout, components and responsive styling
- `app.js` — event logic, validation, CRUD and localStorage
- `PROJECT_REPORT.pdf` — semester project report
- `SCREENSHOTS_AND_TESTING.md` — screenshot checklist and test cases
- `VIVA_QUESTIONS.md` — viva preparation
- `README.md` — setup and usage

## Suggested Git commands
```bash
git init
git add .
git commit -m "Initial EventHub semester project"
```
Create a repository on GitHub, then follow GitHub's instructions to add the remote and push your code.

## Important academic note
The supplied brief lists PHP or Node.js and MySQL as backend/database options wherever applicable. This implementation intentionally follows the selected constraint of HTML + CSS + JavaScript only and localStorage. In your report and viva, clearly state that localStorage is client-side browser storage, not a relational database or server-side backend. If your faculty requires actual client-server communication, MySQL CRUD, or secure authentication, this version must be extended with an approved backend.
