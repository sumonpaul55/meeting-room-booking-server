import mongoose, { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingModelSchema = new Schema<TBooking>({
  room: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "Rooms" }, // Required ObjectId referencing Rooms
      date: { type: String, required: true }, // Date as string
      slots: { type: String, required: true }, // Array of strings for slots
    },
  ],
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Required ObjectId referencing User
  phone: { type: String, required: true }, // Required string for phone number
  paymentId: { type: String, required: true }, // Required string for payment ID
  email: { type: String, required: true }, // Required string for email
  paymentTime: { type: String, required: true }, // Required string for payment time
  totalAmount: { type: Number, required: [true, "Total amount please"] }, // Optional number for totalAmount
  isConfirmed: { type: String, enum: ["confirmed", "unconfirmed", "canceled"], default: "unconfirmed" }, // Optional enum field
  isDeleted: { type: Boolean, default: false },
});

export const Bookings = model<TBooking>("Bookings", bookingModelSchema);
