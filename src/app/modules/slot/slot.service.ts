import httpStatus from "http-status";
import AppError from "../../erros/AppError";
import { Rooms } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { checkSlotExist, createSlots, generateSlot } from "./slot.utils";

const addSlotDb = async (payload: TSlot) => {
  //create slots times
  const createSlotTime = await generateSlot(payload?.startTime, payload?.endTime);

  // check slot time is available
  const slotExist = await checkSlotExist(payload.room, payload.date, createSlotTime);

  if (slotExist) {
    throw new AppError(httpStatus.NOT_FOUND, "One or more slots already exist within the specified time range.");
  }
  return await createSlots(payload.room, payload.date, createSlotTime);
};

const getAllSlotDB = async (payload: any) => {
  if (Object?.values(payload)?.length) {
    const result = await Slot.find({
      $or: [{ date: payload.date }, { room: payload.roomId }],
      isBooked: false,
    }).populate("room");
    return result;
  } else {
    const result = await Slot.find({ isBooked: false }).populate("room");
    return result;
  }
};
// delete slot
const deleteSlotDb = async (payload: string) => {
  // check slot is exist
  const isexist = await Slot.findById(payload);
  if (!isexist) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot Not found for delete");
  }
  const result = await Slot.deleteOne({ _id: payload });
  return result;
};
// update slot
const updateSlots = async (id: string, payload: TSlot) => {
  // check check room available or not
  const isRoomAvailable = await Rooms.findById(payload.room);
  if (!isRoomAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found with this " + payload.room);
  }
  // check the slot shedule is available
  const isSlotAvailabe = await Slot.findOne({
    room: payload.room,
    date: payload.date,
    startTime: payload.startTime,
    endTime: payload.endTime,
    isBooked: false,
  });
  if (isSlotAvailabe) {
    throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
  }
  // check slot is exist
  const isexist = await Slot.findById(id);

  // return result;
};

export const slotService = {
  addSlotDb,
  getAllSlotDB,
  deleteSlotDb,
  updateSlots,
};
