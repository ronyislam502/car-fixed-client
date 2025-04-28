import { TService } from "./service";
import { TSlot } from "./slot";
import { TUserDetail } from "./user";

export type TBooking = {
  _id: string;
  user: TUserDetail;
  service: TService;
  slot: TSlot;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  tax: number;
  grandAmount: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};
