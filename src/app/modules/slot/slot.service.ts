import mongoose, { ObjectId } from "mongoose";
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
// old slot delete and create 5 slot each month 10 date autometically
const getAllSlotDB = async (payload: any) => {
  if (Object?.values(payload)?.length) {
    const result = await Slot.find({
      $or: [{ date: payload.date }, { room: payload.roomId }, { isBooked: payload.isBooked }],
    })
      .populate("room")
      .sort(payload.sort);
    return result;
  } else {
    const result = await Slot.find().populate("room").sort("room");
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
// delete all old slot
const deleteALLOldSlotDb = async () => {
  // check slot is exist
  const today = new Date();
  // set all time 0 like hour, munites, seconds, miliseconds
  today.setHours(0, 0, 0, 0);
  // const avaialbe = await Slot.find({ date: { $lt: today }, isBooked: false });
  await Slot.deleteMany({ date: { $lt: today }, isBooked: false });
  // create slot autometically for the room of pinacle place
  // {
  //   room: '66d6069ef66824cf0dd82f8b',
  //   date: '2024-12-17T18:00:00.000Z',
  //   endTime: '13:00',
  //   startTime: '10:00'
  // }
  // Main function to create slots on the 15th
  // Generate the slot times, e.g., 10:00 and 15:00
  const createSlotTime = await generateSlot("10:00", "15:00");
  // Set the date to the 15th of the current month
  const now = new Date();
  const fifteenthOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  const roomId = new mongoose.Types.ObjectId("66d32f64c7529009f28cebd0"); //create dynamic slot for pinnacle room every month
  // Check if the slot already exists on the 15th
  const slotExist = await Slot.find({ room: roomId, date: { $lte: fifteenthOfMonth }, isBooked: false });
  if (slotExist.length) {
    throw new AppError(httpStatus.CONFLICT, "One or more slots already exist within the specified time range.");
  } else {
    // Create the slot if it doesn't exist
    await createSlots(roomId, fifteenthOfMonth, createSlotTime);
  }
  // check already exist or not
};
// update slot
const updateSlots = async (id: string, payload: TSlot) => {
  // check updateable slot exist
  const isExistRequestedSlot = await Slot.findById(id);
  if (!isExistRequestedSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "This Slot is not Exist");
  }
  // empty array for creatd slots
  const comingSlots = [];
  if (payload.startTime && payload.endTime) {
    comingSlots.push({ startTime: payload.startTime, endTime: payload.endTime });
    // check the slot shedule is available
    const slotNotexist = await checkSlotExist(payload.room, payload.date, comingSlots);
    if (slotNotexist) {
      throw new AppError(httpStatus.CONFLICT, "Slot Time is not available");
    }
  }
  const result = await Slot.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const slotService = {
  addSlotDb,
  getAllSlotDB,
  deleteSlotDb,
  updateSlots,
  deleteALLOldSlotDb,
};
