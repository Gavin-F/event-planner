# Event Planner Application

An event planner app that allows users to create, edit, delete, search events with a list view and an interactive timeline view.  

---

## Features

- Create new events
- Edit existing events
- Delete events
- Search events by title
- Paginated event list
- Timeline view with:
  - Drag and drop event reordering
- Structured API responses with error codes
- Event validation (frontend and backend)

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS, react-hook-form, Sonner (toasts), react-calendar-timeline
- **Backend**: Flask, SQLAlchemy, Alembic (Migrations), PostgreSQL
- **Containerization**: Docker

---

## Run with Docker

```bash
docker-compose up --build
```

- Frontend available at [http://localhost:3000](http://localhost:3000)
- Backend available at [http://localhost:5000](http://localhost:5000/api/events)

