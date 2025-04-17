"use client";

import { useState } from "react";
import { CalendarIcon, PlusIcon, LayoutList, CalendarDays } from "lucide-react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import EventTimeline from "../components/EventTimeline";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [showCreate, setShowCreate] = useState(false);
  const [refreshList, setRefreshList] = useState(0);
  const [view, setView] = useState<"list" | "timeline">("list");

  const handleCreated = () => {
    setShowCreate(false);
    setRefreshList((r) => r + 1);
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Event Planner</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView(view === "list" ? "timeline" : "list")}
          >
            {view === "list" ? (
              <>
                <CalendarDays className="w-4 h-4 mr-1" />
                Timeline View
              </>
            ) : (
              <>
                <LayoutList className="w-4 h-4 mr-1" />
                List View
              </>
            )}
          </Button>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
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
      </div>

      {view === "list" ? (
        <EventList refreshKey={refreshList} />
      ) : (
        <EventTimeline refreshKey={refreshList} />
      )}
    </main>
  );
}
