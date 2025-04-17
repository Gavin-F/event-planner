"use client";

import { useState } from "react";
import { CalendarIcon, PlusIcon } from "lucide-react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { useEvents } from "../hooks/useEvents";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { events, fetchEvents } = useEvents();
  const [open, setOpen] = useState(false);

  const handleCreated = () => {
    fetchEvents();
    setOpen(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Event Planner</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <PlusIcon className="w-4 h-4" /> New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-sm p-6 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Create New Event
              </DialogTitle>
            </DialogHeader>
            <EventForm mode="create" onEventSaved={handleCreated} />
          </DialogContent>
        </Dialog>
      </div>

      <EventList />
    </main>
  );
}
