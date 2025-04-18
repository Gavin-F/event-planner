import axios from "axios";
import { Event } from "../types/Event";

const api = axios.create({
  baseURL: "http://localhost:5000/api/events/",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaginatedEvents {
  data: {
    items: Event[];
    total: number;
  }
}

export const eventApi = {
  getAll(page = 1, limit = 10): Promise<PaginatedEvents> {
    return api.get("/", { params: { page, limit } }).then(res => res.data);
  },

  create(data: Omit<Event, "id">): Promise<Event> {
    return api.post("/", data).then(res => res.data);
  },

  update(id: number, data: Omit<Event, "id">): Promise<Event> {
    return api.put(`/${id}`, data).then(res => res.data);
  },

  delete(id: number): Promise<void> {
    return api.delete(`/${id}`).then(() => {});
  },

  search(query: string, page = 1, limit = 10): Promise<PaginatedEvents> {
    return api.get("/search", { params: { title: query, page, limit } }).then(res => res.data);
  },
};
