"use client";

import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { useEvents } from "../hooks/useEvents";

export default function HomePage() {
  const { events, fetchEvents } = useEvents();

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">📅 Event Planner</h1>
      <EventForm onEventCreated={fetchEvents} />
      <EventList events={events} />
    </main>
  );
}
