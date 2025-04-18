"use client";

import { useEffect, useState } from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";
import { eventService } from "../services/eventService";
import "react-calendar-timeline/style.css";
import { Event } from "../types/Event";

interface Props {
  refreshKey: number;
}

const typeColors: Record<string, string> = {
  Merger: "#3b82f6",
  Dividends: "#10b981",
  "New Capital": "#8b5cf6",
  Hire: "#facc15",
};

export default function EventTimeline({ refreshKey }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await eventService.fetchEvents();
      const grouped = data.items.map((event: Event) => ({
        id: event.id,
        title: event.title,
      }));

      const timelineItems = data.items.map((event: Event) => ({
        id: event.id,
        group: event.id,
        title: event.title,
        type: event.type,
        start_time: moment(event.start_date),
        end_time: moment(event.end_date),
        style: {
          background: typeColors[event.type] || "#94a3b8",
          color: "#fff",
          borderRadius: 4,
        },
      }));

      setGroups(grouped);
      setItems(timelineItems);
    };

    fetchData();
  }, [refreshKey]);

  const handleItemMove = async (itemId: number, dragTime: number) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const duration = moment(item.end_time).diff(moment(item.start_time));
    const newStart = moment(dragTime);
    const newEnd = moment(dragTime).add(duration, "milliseconds");

    await eventService.updateEvent(itemId, {
      title: item.title,
      type: item.type,
      start_date: newStart.format("YYYY-MM-DD"),
      end_date: newEnd.format("YYYY-MM-DD"),
    });

    const updatedItems = items.map((i) =>
      i.id === itemId
        ? { ...i, start_time: newStart, end_time: newEnd }
        : i
    );
    setItems(updatedItems);
  };

  return (
    <div className="mt-4 border rounded">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={Number(moment().subtract(1, "month"))}
        defaultTimeEnd={Number(moment().add(2, "month"))}
        lineHeight={40}
        itemHeightRatio={0.9}
        stackItems={false}
        canMove={true}
        canResize={false}
        onItemMove={(itemId, dragTime) => {
          handleItemMove(Number(itemId), dragTime);
        }}
        itemRenderer={({ item, itemContext, getItemProps }) => {
          const { key, ...rest } = getItemProps({
            style: {
              ...item.style,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              fontSize: 12,
              fontWeight: 500,
            },
          });

          return (
            <div key={key} {...rest}>
              <span>{item.title}</span>
              <span style={{ opacity: 0.75, fontSize: "0.7rem" }}>{item.type}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
