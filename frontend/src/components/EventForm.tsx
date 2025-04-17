"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createEvent, updateEvent } from "../services/api";
import { Event } from "../types/Event";

interface Props {
  mode: "create" | "edit";
  initialData?: Event;
  onEventSaved: () => void;
}

const EVENT_TYPES = ["Merger", "Dividends", "New Capital", "Hire"];

export default function EventForm({ mode, initialData, onEventSaved }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {
      title: "",
      type: "",
      start_date: "",
      end_date: "",
    }
  });

  const onSubmit = async (data: any) => {
    if (mode === "edit" && initialData?.id) {
      await updateEvent(initialData.id, data);
    } else {
      await createEvent(data);
    }

    onEventSaved();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 min-h-[300px]">
      <div className="space-y-1">
        <label className="block text-sm font-medium">Title</label>
        <Input
          placeholder="Event Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Type</label>
        <Controller
          name="type"
          control={control}
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Start Date</label>
          <Input
            type="date"
            {...register("start_date", { required: "Start date is required" })}
          />
          {errors.start_date && <p className="text-sm text-red-500">{errors.start_date.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">End Date</label>
          <Input
            type="date"
            {...register("end_date", { required: "End date is required" })}
          />
          {errors.end_date && <p className="text-sm text-red-500">{errors.end_date.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full">
        {mode === "edit" ? "Save Changes" : "Create Event"}
      </Button>
    </form>
  );
}
