# WellConnect Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-ISC-green)

WellConnect is a mental health web platform built for the people. It connects individuals with verified therapists, enables anonymous peer support, and empowers users with daily mood tracking — all in one secure, accessible application.

---

---

## Features

### For Community Members
| Feature | Description |
|---|---|
| **Mood Tracking** | Log daily mood (1–10 slider) with optional journal notes |
| **Mood History** | Visual chart of mood trends over 7 or 30 days |
| **Community Stories** | Share mental health stories anonymously |
| **Peer Support** | Like and comment on stories from others |
| **Therapist Booking** | Book sessions with verified, culturally-aware therapists |
| **Secure Messaging** | End-to-end encrypted chat with your therapist |
| **Intake Assessment** | PHQ-9 and GAD-7 mental health screening |

### For Therapists
| Feature | Description |
|---|---|
| **Therapist Portal** | Dedicated login and dashboard |
| **Appointment Management** | View, confirm, and manage patient sessions |
| **Secure Client Chat** | Real-time encrypted messaging with patients |
| **Client Mood Insights** | View patient mood history and trends |

### For Admins
| Feature | Description |
|---|---|
| **Admin Dashboard** | Manage therapist accounts and approvals |
| **Content Moderation** | Review and moderate community stories |
| **Taxonomy Management** | Manage categories and tags for stories |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Auth | Google OAuth2 · JWT Bearer Tokens |
| State | React Hooks (`useState`, `useEffect`) |
| Real-time | WebSocket (chat) |
| API | REST — Spring Boot backend at `localhost:8081` |

---


---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- Backend API running at `http://localhost:8081` (see [WellConnect Backend](https://github.com/Nnamdi004/WellConnectBackend))

### Installation

```bash
# Clone the repository
git clone https://github.com/Nnamdi004/WellConnectFrontend.git
cd WellConnectFrontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
```

> **Note:** `.env.local` is gitignored and should never be committed.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | User login via Google OAuth2 |
| `/register` | Public | User registration |
| `/dashboard` | User | Mood tracking dashboard |
| `/feed` | User | Community stories feed |
| `/feed/new` | User | Create a new story |
| `/mood-tracking` | Public | Mood tracking feature overview |
| `/messages` | User | Secure chat with therapist |
| `/intake` | User | PHQ-9 / GAD-7 assessment |
| `/how-it-works` | Public | Therapist matching explained |
| `/help` | Public | Help center |
| `/therapist-login` | Therapist | Therapist portal login |
| `/therapist` | Therapist | Therapist dashboard |
| `/admin-login` | Admin | Admin portal login |
| `/admin` | Admin | Admin control panel |

---

## Authentication

WellConnect uses **Google OAuth2** for user authentication. The app stores JWT tokens in `localStorage` by key:

| Token Key | Role |
|---|---|
| `user_token` | Community member |
| `therapist_token` | Verified therapist |
| `admin_token` | Platform administrator |

The `Navbar` component dynamically renders navigation links and sign-out actions based on the active token.

---

## API Client

All API interactions are handled through `src/lib/api.ts`. The base URL defaults to `http://localhost:8081` and can be overridden via `NEXT_PUBLIC_API_URL`.

### Modules

| Module | Functions |
|---|---|
| **Auth** | `adminLogin`, `therapistLogin`, `userRegister` |
| **Mood** | `logMood`, `getMoodHistory` |
| **Stories** | `getFeed`, `createStory`, `likeStory`, `unlikeStory`, `getComments`, `addComment` |
| **Appointments** | `getMyAppointments`, `bookAppointment`, `updateAppointmentStatus` |
| **Intake** | `submitIntake`, `getMyIntake` |
| **Chat** | `getMySessions`, `getSessionMessages`, `sendChatMessage` |
| **Admin** | `registerTherapist`, `getAllTherapists`, `updateTherapist`, `deleteTherapist` |
| **WebSocket** | `createWebSocket` |

---

## Design System

WellConnect uses a consistent green color palette throughout:

| Token | Color | Usage |
|---|---|---|
| Primary | `#10B981` | Buttons, active states, highlights |
| Primary Dark | `#059669` | Hover states, accents |
| Light BG | `#ECFDF5` | Section backgrounds, chips |
| Text Primary | `#1F2937` | Headings, body |
| Text Muted | `#6B7280` | Subtitles, helper text |

All components are built with **Tailwind CSS 4** utility classes. The UI is fully responsive with a mobile-first approach and no external component library.

---

## Emergency Support

WellConnect integrates Rwanda's mental health crisis resources directly in the UI:

- **Rwanda Crisis Line:** 3026 (24/7, free)
- **SMS:** Text `HELP` to 3026
- **In-app chat** available via the Messages tab

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## Indo

 This part of the project was worked on Kelvin and Chibueze of the WellConnect team.

---

*Built with care for mental health accessibility in Rwanda.*
