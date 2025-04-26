import { TService } from "./service";

export type TSlot = {
  _id: string;
  service: TService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
  createdAt: string;
  updatedAt: string;
};
