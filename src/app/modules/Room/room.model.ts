import { model, Schema } from "mongoose";
import { TRooms } from "./room.interface";

const roomsModelSchema = new Schema<TRooms>({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: [{ type: String }],
  isDeleted: { type: Boolean, default: false },
});

export const Rooms = model<TRooms>("Rooms", roomsModelSchema);
