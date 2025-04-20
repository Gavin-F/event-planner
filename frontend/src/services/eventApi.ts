import axios from "axios";
import { Event } from "../types/Event";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}events/`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PaginatedEventsResponse {
  data: {
    items: Event[];
    total: number;
  }
  success: boolean
  error?: {
    message: string,
    code: number
  }
}

export interface EventResponse {
  data: Event;
  success: boolean;
  error?: {
    message: string,
    code: number
  }
}

export const eventApi = {
  getAll(page = 1, limit = 10): Promise<PaginatedEventsResponse> {
    return api.get("/", { params: { page, limit } }).then(res => res.data);
  },

  create(data: Omit<Event, "id">): Promise<EventResponse> {
    return api.post("/", data).then(res => res.data);
  },

  update(id: number, data: Omit<Event, "id">): Promise<EventResponse> {
    return api.put(`/${id}`, data).then(res => res.data);
  },

  delete(id: number): Promise<void>{
    return api.delete(`/${id}`).then(res => {});
  },

  search(query: string, page = 1, limit = 10): Promise<PaginatedEventsResponse> {
    return api.get("/search", { params: { title: query, page, limit } }).then(res => res.data);
  },
};
