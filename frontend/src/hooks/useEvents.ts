import { useEffect, useState } from "react";
import { Event } from "../types/Event";
import { getEvents } from "../services/api";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, fetchEvents };
}
