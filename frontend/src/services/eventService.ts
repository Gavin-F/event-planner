import { eventApi } from "./eventApi";
import { Event } from "../types/Event";

export const eventService = {
  async fetchEvents(page = 1, limit = 10) {
    const res = await eventApi.getAll(page, limit);
    if (!res.success) throw new Error(res.error!.message);
    return res;
  },

  async createEvent(data: Omit<Event, "id">) {
    const res = await eventApi.create(data);
    if (!res.success) throw new Error(res.error!.message);
    return res;
  },

  async updateEvent(id: number, data: Omit<Event, "id">) {
    const res = await eventApi.update(id, data);
    if (!res.success) throw new Error(res.error!.message);
    return res;
  },

  async deleteEvent(id: number) {
    const res = await eventApi.delete(id);
    if (!res.success) throw new Error(res.error!.message);
    return res;
  },

  async searchEvents(query: string, page = 1, limit = 10) {
    const res = await eventApi.search(query, page, limit);
    if (!res.success) throw new Error(res.error!.message);
    return res;
  },
};
