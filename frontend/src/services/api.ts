import axios from "axios";
import { Event } from "../types/Event";

const BASE_URL = "http://localhost:5000/api/events/";

export const getEvents = async (): Promise<Event[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createEvent = async (data: Omit<Event, "id">): Promise<Event> => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};
