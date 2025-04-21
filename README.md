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
#### Clone the repo
```bash
git clone git@github.com:Gavin-F/event-planner.git
cd ./event-planner/backend
```
#### Create .env file
```
Create .env in /backend and paste the following:

FLASK_APP=run.py
FLASK_ENV=development

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=events_db
DATABASE_URL=postgresql://postgres:postgres@db:5432/events_db
```
#### Run the application
```bash
docker-compose up --build
```

- Frontend available at [http://localhost:3000](http://localhost:3000)

