import { z } from "zod";
import { bookingValidation } from "./booking.validation";
import mongoose from "mongoose";

export type TBooking = {
  room: { _id: mongoose.Types.ObjectId; date: string; slots: string[] }[];
  user: mongoose.Types.ObjectId;
  phone: string;
  paymentId: string;
  email: string;
  paymentTime: string;
  totalAmount?: number;
  isConfirmed?: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
};

// export type TBooking = z.infer<typeof bookingValidation.bookingValidationSchema>;
