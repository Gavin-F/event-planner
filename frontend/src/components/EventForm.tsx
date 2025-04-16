"use client";

import { useState } from "react";
import { createEvent } from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

interface Props {
  onEventCreated: () => void;
}

const EVENT_TYPES = ["Merger", "Dividends", "New Capital", "Hire"];

export default function EventForm({ onEventCreated }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    type: EVENT_TYPES[0],
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await createEvent(formData);
      onEventCreated();
      setFormData({
        title: "",
        type: EVENT_TYPES[0],
        start_date: "",
        end_date: "",
      });
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
      <Input
        name="title"
        type="text"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
      />

      <Select
        onValueChange={(val) => setFormData({ ...formData, type: val })}
        defaultValue={formData.type}
      >
        <SelectTrigger>
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          {EVENT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="start_date"
          type="date"
          value={formData.start_date}
          onChange={handleChange}
        />
        <Input
          name="end_date"
          type="date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Create Event
      </Button>
    </form>
  );
}
