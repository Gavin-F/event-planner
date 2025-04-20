"use client";

import { useEffect, useState } from "react";
import { Trash2, Pencil, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { eventService } from "../services/eventService";
import EventForm from "./EventForm";

interface Event {
  id: number;
  title: string;
  type: string;
  start_date: string;
  end_date: string;
}

export default function EventList({ refreshKey }: { refreshKey: number }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [editTarget, setEditTarget] = useState<Event | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const LIMIT = 5;

  const fetchData = async () => {
    if (query.trim()) {
      const res = await eventService.searchEvents(query, page, LIMIT);
      setEvents(res.data.items);
      setTotal(res.data.total);
    } else {
      const res = await eventService.fetchEvents(page, LIMIT);
      setEvents(res.data.items);
      setTotal(res.data.total);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refreshKey]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this event?")) {
      await eventService.deleteEvent(id);
      fetchData();
    }
  };

  const handleEdit = (event: Event) => {
    setEditTarget(event);
    setShowEdit(true);
  };

  const handleEdited = async () => {
    setShowEdit(false);
    fetchData();
  };

  return (
    <div className="space-y-4">
      <form
        className="flex gap-2 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Input
          placeholder="Search events by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit" variant="outline">
          <Search className="w-4 h-4" />
        </Button>
      </form>


      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 flex justify-between items-start gap-4"
          >
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.type}</p>
              <p className="text-sm">
                {event.start_date} → {event.end_date}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => handleEdit(event)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(event.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-sm text-muted-foreground">No events found, try creating one!</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Prev
        </Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const maxPage = Math.ceil(total / LIMIT);
            if (page < maxPage) setPage((p) => p + 1);
          }}
          disabled={page >= Math.ceil(total / LIMIT)}
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">Edit Event</DialogTitle>
          </DialogHeader>
          {editTarget && (
            <EventForm
              mode="edit"
              initialData={editTarget}
              onEventSaved={handleEdited}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
