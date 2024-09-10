import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.string({ required_error: "Room Id is required" }),
    slots: z.array(z.string()),
    user: z.string({ required_error: "User Id is require" }),
    date: z.string({ required_error: "date is required" }),
    phone: z.string({ required_error: "Phone need" }),
    address: z.string({ required_error: "booaddress is required" }),
    totalAmount: z.number({ required_error: "Total amount of selected slot" }).optional(),
  }),
});
const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z.string({ required_error: "Room Id is required" }).optional(),
    slots: z.array(z.string()).optional(),
    user: z.string({ required_error: "User Id is require" }).optional(),
    phone: z.number({ required_error: "Phone need" }).optional(),
    address: z.string({ required_error: "booaddress is required" }).optional(),
    date: z.string({ required_error: "booking date is required" }).optional(),
    totalAmount: z.string({ required_error: "Total amount of selected slot" }).optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
};
