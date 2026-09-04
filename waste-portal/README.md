# Sahana — Municipal Waste Schedule & Missed Pickup Portal

A hackathon prototype for Sri Lankan citizens to:
- Check local council garbage collection schedules with a live countdown
- Ask a mock "AI" sorter how to classify a tricky waste item
- Report a missed pickup, with fully validated inline form errors
- Browse a community feed of recent reports

## Tech stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose

## Project structure
```
waste-portal/
├── backend/
│   ├── models/Report.js
│   ├── routes/reports.js       # POST/GET /api/reports
│   ├── routes/classify.js      # POST /api/classify
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # Navbar, ScheduleViewer, AiSorter, ReportForm, CommunityFeed, StatusBadge
    │   ├── data/schedules.js   # sample council schedules
    │   ├── utils/countdown.js  # next-pickup calculation
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

## Running it locally

### 1. Backend
```bash
cd backend
cp .env.example .env      # edit MONGO_URI if needed
npm install
npm run dev                # or: npm start
```
The API starts on `http://localhost:5000`. If MongoDB isn't reachable, the
server still boots so `/api/classify` keeps working during a demo — only
`/api/reports` needs the database.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Vite starts on `http://localhost:5173` and proxies `/api/*` requests to the
backend (see `vite.config.js`), so no extra CORS config is needed in dev.

## API reference

| Method | Route            | Body                                                              | Description                        |
|--------|------------------|--------------------------------------------------------------------|-------------------------------------|
| POST   | `/api/classify`  | `{ "item": "glass bottle" }`                                       | Keyword-based mock AI classification |
| POST   | `/api/reports`   | `{ name, council, address, wasteType, description }`               | Save a missed-pickup report          |
| GET    | `/api/reports`   | —                                                                    | List the 50 most recent reports      |

## Notes for judges
- Schedule data in `frontend/src/data/schedules.js` is static sample data
  for six Sri Lankan municipal councils — easy to extend with real data.
- The countdown in `utils/countdown.js` recalculates live against the
  system clock, handling "today", "tomorrow", and multi-day waits.
- Form validation is fully custom (no native browser `alert`/`required`
  popups) — errors render as inline red text under each field.
