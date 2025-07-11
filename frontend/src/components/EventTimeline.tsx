"use client";

import { useEffect, useState } from "react";
import Timeline, { TimelineMarkers, TodayMarker } from "react-calendar-timeline";
import moment from "moment";
import { eventService } from "../services/eventService";
import "react-calendar-timeline/style.css";
import { Event } from "../types/Event";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Props {
  refreshKey: number;
}

interface TimelineItem {
  id: number;
  group: number;
  title: string;
  type: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  style: React.CSSProperties;
}

interface TimelineGroup {
  id: number;
  title: string;
}

const typeColors: Record<string, string> = {
  Merger: "#3b82f6",
  Dividends: "#10b981",
  "New Capital": "#8b5cf6",
  Hire: "#facc15",
};

export default function EventTimeline({ refreshKey }: Props) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [groups, setGroups] = useState<TimelineGroup[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await eventService.fetchEvents();
      if (res.success) {
        const grouped = res.data.items.map((event: Event) => ({
          id: event.id,
          title: event.title,
        }));

        const timelineItems = res.data.items.map((event: Event) => ({
          id: event.id,
          group: event.id,
          title: event.title,
          type: event.type,
          start_time: moment(event.start_date),
          end_time: moment(event.end_date),
          style: {
            background: typeColors[event.type],
            color: "#fff",
            borderRadius: 4,
          },
        }));

        setGroups(grouped);
        setItems(timelineItems);
      }
    };

    fetchData();
  }, [refreshKey]);

  const handleItemMove = async (itemId: number, dragTime: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const duration = moment(item.end_time).diff(moment(item.start_time));
    const newStart = moment(dragTime);
    const newEnd = moment(dragTime).add(duration, "milliseconds");

    const updatedItems = items.map((i) =>
      i.id === itemId
        ? { ...i, start_time: newStart, end_time: newEnd }
        : i
    );
    setItems(updatedItems);

    const res = await eventService.updateEvent(itemId, {
      title: item.title,
      type: item.type,
      start_date: newStart.format("YYYY-MM-DD"),
      end_date: newEnd.format("YYYY-MM-DD"),
    });

    if (!res.success) {
      toast.error("Failed to update event. Please try again.");
    } else {
      toast.success("Event updated!");
    }
  };

  return (
    <div className="mt-4 border rounded">
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No events scheduled yet.
        </div>
      ) : (
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={Number(moment().subtract(2, "month"))}
        defaultTimeEnd={Number(moment().add(2, "month"))}
        lineHeight={40}
        itemHeightRatio={0.9}
        stackItems={false}
        canMove={true}
        canResize={false}
        onItemMove={(itemId, dragTime) => {
          handleItemMove(Number(itemId), dragTime);
        }}
        itemRenderer={({ item, getItemProps }) => {
          const { key, ...rest } = getItemProps({
            style: {
              ...item.style,
              minWidth: "80px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 8px",
              fontSize: 12,
              fontWeight: 500,
            },
          });

          return (
            <div key={key} {...rest}>
              {item.title}
            </div>
          );
        }}
      >
        <TimelineMarkers>
          <TodayMarker>
          </TodayMarker>
        </TimelineMarkers>
      </Timeline>
      )}
    <Toaster />
    </div>
  );
}
