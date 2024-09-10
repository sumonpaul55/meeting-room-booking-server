import httpStatus from "http-status";
import AppError from "../../erros/AppError";
import { Rooms } from "../Room/room.model";
import { TBooking } from "./booking.interface";
import { Bookings } from "./booking.model";
import { Slot } from "../slot/slot.model";
import { User } from "../User/user.model";

import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.SECRET_KET as string);

const confiremPayment = async (payload: { paymentId: string; total: number }) => {
  const { paymentId, total } = payload;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    payment_method: paymentId,
    confirm: true,
    return_url: `${config.CLIENT_SITE_URL}/success`,
  });
  return paymentIntent;
};

const addBookingDb = async (payload: TBooking) => {
  console.log(payload);
  // check slot by date and room available or not
  const isExistSlot = await Slot.find({});

  if (!isExistSlot?.length) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot is not available");
  }
  // // get rooms
  // const targetedRooms = await Rooms.findById(payload.room);
  // if (!targetedRooms) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Room not Found");
  // }
  // // payload.totalAmount = targetedRooms?.pricePerSlot * payload.slots.length;
  // const result = await Bookings.create(payload);
  // const newBookingId = result._id;
  // // change the isBooked status
  // await Slot.updateMany({ _id: payload.slots }, { isBooked: true }, { new: true });

  // const lastBookinged = await Bookings.findById(newBookingId).populate("room").populate("slots").populate("user");
  // return lastBookinged;
};
const getAllBookingFromDb = async () => {
  const result = await Bookings.find({ isDeleted: false }).populate("room").populate("slots").populate("user");
  return result;
};
const getMyBookings = async (payload: string) => {
  // get the user First
  const userData = await User.findOne({ email: payload, isDeleted: false });
  const userId = userData?._id;
  const result = await Bookings.findOne({ user: userId }).populate("room").populate("slots").populate("user");
  return result;
};
const updateBookingDb = async (id: string, payload: TBooking) => {
  await Bookings.findByIdAndUpdate(id, payload, { new: true });
  const bookedi = await Bookings.findById(id).populate("room").populate("slots").populate("user");
  return bookedi;
};
const deleteBookingDb = async (id: string) => {
  // confirm bookings is exist
  const isExist = await Bookings.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, "No Booking Found");
  }
  const result = await Bookings.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
  return result;
};

export const bookingService = {
  addBookingDb,
  getAllBookingFromDb,
  getMyBookings,
  updateBookingDb,
  deleteBookingDb,
  confiremPayment,
};
