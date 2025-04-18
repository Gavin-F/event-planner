import { eventApi } from "./eventApi";
import { Event } from "../types/Event";

export const eventService = {
  async fetchEvents(page = 1, limit = 10) {
    return await eventApi.getAll(page, limit);
  },

  async createEvent(data: Omit<Event, "id">) {
    return await eventApi.create(data);
  },

  async updateEvent(id: number, data: Omit<Event, "id">) {
    return await eventApi.update(id, data);
  },

  async deleteEvent(id: number) {
    return await eventApi.delete(id);
  },

  async searchEvents(query: string, page = 1, limit = 10) {
    return await eventApi.search(query, page, limit);
  },
};
