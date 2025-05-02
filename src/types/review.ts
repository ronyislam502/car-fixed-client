import { TBooking } from "./booking";
import { TService } from "./service";
import { TUserDetail } from "./user";

export type TReview = {
  _id: string;
  user: TUserDetail;
  booking: TBooking;
  service: TService;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
