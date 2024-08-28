import { isAborted } from "zod";
import { TRooms } from "./room.interface";
import { Rooms } from "./room.model";
import handleEmptyData from "../../utils/handleEmptyData";

const creatRooms = async (payLoad: TRooms) => {
  const result = await Rooms.create(payLoad);
  return result;
};
// get a rooms
const getAllRoomsFromDb = async () => {
  const result = await Rooms.find();
  return handleEmptyData(result);
};
// get a rooms
const getAroomsFromDb = async (id: string) => {
  const result = await Rooms.findById(id);
  return handleEmptyData(result);
};
// update rooms into db
const updateRoomsIntoDb = async (id: string, payLoad: TRooms) => {
  // const { amenities, ...restData } = payLoad;
  const result = await Rooms.findByIdAndUpdate(id, payLoad, {
    new: true,
    runValidators: true,
  });
  console.log(result);
  return result;
};
const deleteRoomFromDb = async (payload: string) => {
  const result = await Rooms.findByIdAndUpdate(payload, { isDeleted: true }, { new: true });
  return result;
};

export const roomsServices = {
  creatRooms,
  getAllRoomsFromDb,
  getAroomsFromDb,
  updateRoomsIntoDb,
  deleteRoomFromDb,
};
