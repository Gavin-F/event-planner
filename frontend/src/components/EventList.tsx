"use client";

import { Event } from "../types/Event";

interface Props {
  events: Event[];
}

export default function EventList({ events }: Props) {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div key={event.id} className="border rounded-xl p-4 bg-white shadow-sm">
          <div className="text-lg font-medium">{event.title}</div>
          <div className="text-sm text-muted-foreground">{event.type}</div>
          <div className="text-sm">
            {event.start_date} → {event.end_date}
          </div>
        </div>
      ))}
    </div>
  );
}
