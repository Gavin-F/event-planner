import axios from "axios";
import { Event } from "../types/Event";

const BASE_URL = "http://localhost:5000/api/events/";

export const getEvents = async (page = 1, limit = 10): Promise<{ data: Event[]; total: number }> => {
  const res = await axios.get(BASE_URL, {
    params: { page, limit },
  });
  return res.data;
};

export const createEvent = async (data: Omit<Event, "id">): Promise<Event> => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateEvent = async (id: number, data: Omit<Event, "id">): Promise<Event> => {
  const res = await axios.put(`${BASE_URL}${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}${id}`);
};

export const searchEvents = async (
  query: string,
  page = 1,
  limit = 10
): Promise<{ data: Event[]; total: number }> => {
  const res = await axios.get(`${BASE_URL}search`, {
    params: { title: query, page, limit },
  });
  return res.data;
};
