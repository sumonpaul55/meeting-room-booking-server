import httpStatus from "http-status";
import AppError from "../../erros/AppError";
import { Rooms } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { createSlot } from "./slot.utils";
import catchAsync from "../../utils/catchAsync";

const addSlotDb = async (payload: TSlot) => {
  // check slot block or not
  const isRoomAvailable = await Rooms.findById(payload.room);
  if (!isRoomAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found with this " + payload.room);
  }
  // check the slot shedule is available
  const isSlotAvailabe = await Slot.findOne({
    room: payload.room,
    date: payload.date,
  });
  if (isSlotAvailabe) {
    throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
  } else return await createSlot(payload.startTime, payload.endTime, payload.room, payload.date);
};

const getAllSlotDB = async (payload: any) => {
  if (payload.date || payload.roomId) {
    const result = await Slot.find({
      $or: [{ date: payload.date }, { room: payload.roomId }],
      isBooked: false,
    });
    return result;
  } else {
    const result = await Slot.find({ isBooked: false });
    return result;
  }
};

export const slotService = {
  addSlotDb,
  getAllSlotDB,
};
