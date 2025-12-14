# ReflectHub Client

ReflectHub is a modern community platform for sharing **life lessons**, discovering **community wisdom**, and unlocking **premium content** through membership.

- **Focus**: Write, read, and learn from real stories.
- **Experience**: Clean UI with Tailwind + DaisyUI.
- **Auth**: Firebase Authentication (Email/Password + Google).
- **Payments**: Stripe-powered membership checkout.

## Highlights

- **Explore Lessons**
  - Browse lessons by category.
  - Search by title.
  - Premium lessons are visually marked.
- **Lesson Details**
  - Premium lock logic (Premium users + Admin can access Premium lessons).
  - Like (Love) + Save features (client-side local storage).
- **Dashboard**
  - Add Lesson
  - My Lessons (manage your own lessons)
  - My Favorites (saved lessons)
  - Profile
- **Admin**
  - Manage Lessons (toggle “featured”)
  - Users management (if enabled by backend)

## Tech Stack

- **Frontend**: React 19, React Router DOM 7
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Auth**: Firebase
- **Payments**: Stripe (React Stripe JS)
- **Utilities**: Axios, SweetAlert2, React Icons
- **Build Tool**: Vite

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root:

```bash
# API (your backend server)
VITE_API_BASE_URL=http://localhost:3000

# Firebase
VITE_FIREBASE_API_KEY=YOUR_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# ImgBB (used in Register flow for image upload)
VITE_IMGBB_API_KEY=YOUR_IMGBB_KEY
```

### 3) Run locally

```bash
npm run dev
```

### 4) Production build

```bash
npm run build
```

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Key Routes

### Public

- `/` Home
- `/lessons` Lessons listing
- `/community` Community page
- `/login` Login
- `/register` Register

### Protected

- `/lessons/:id` Lesson details (requires login)
- `/payment` Membership plan & checkout

### Dashboard (Protected)

- `/dashboard/add-lesson`
- `/dashboard/my-lessons`
- `/dashboard/my-favorites`
- `/dashboard/profile`

### Admin

- `/dashboard/manage-lessons`

## Like (Love) & Save (Favorites)

This project currently implements Like/Save in a **client-side** way using `localStorage`.

- Likes: stored per user (email-based key)
- Saves: stored per user (email-based key)
- Counts: tracked locally per lesson for UI feedback

If you want these counts to be shared across all users/devices, you will need backend endpoints to persist and aggregate counts.

## Project Structure (high-level)

```text
src/
  components/
  contexts/
  hooks/
  Layout/
  pages/
  providers/
  Routes/
  utils/
```

## Notes

- For Google profile images, the UI uses `referrerPolicy="no-referrer"` to prevent image loading issues in some browsers.

## License

This repository is provided as-is. Add a license if you plan to publish it publicly.

---

Made with React + Vite for the ReflectHub experience.
