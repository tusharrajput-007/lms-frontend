# LMS Frontend (React)

The React frontend the trainee must run as-is. Do not modify any file in this directory.
Build the APIs in `/docs/LMS-API.md` so that this UI works end-to-end.

## Setup

```bash
cd frontend/lms
cp .env.example .env
npm install
npm run dev
```

The app opens at `http://localhost:5173`.
It expects the API at `http://localhost:4000` (override via `VITE_API_URL`).

## Pages

| Path | Page |
|---|---|
| `/login` | Login + Register tabs + Google sign-in |
| `/forgot-password` | Forgot password form |
| `/reset-password?token=...` | Reset password form |
| `/auth/callback?token=...` | Google OAuth landing — stores JWT, then redirects to `/books` |
| `/books` | Book list with search + Excel/CSV export + PDF download |
| `/books/add` | Add book (multipart with cover) |
| `/books/:id/edit` | Edit book |
| `/students` | Student list |
| `/students/add` | Add student (multipart with photo) |
| `/students/:id/edit` | Edit student |
| `/issues` | Issue list with status filter |
| `/issues/new` | Issue a book to a student |
