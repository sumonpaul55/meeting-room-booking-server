import mongoose from "mongoose";
import { z } from "zod";

const bookingValidationSchema = z.object({
  body: z.object({
    room: z.array(
      z.object({
        _id: z.instanceof(mongoose.Types.ObjectId), // Validates ObjectId
        date: z.string(), // Basic string validation for date
        slots: z.array(z.string()), // Array of strings for slots
      })
    ),
    user: z.instanceof(mongoose.Types.ObjectId), // ObjectId validation
    phone: z.string(), // Basic string validation for phone number
    paymentId: z.string(), // Basic string validation for payment ID
    email: z.string().email("Invalid email address"), // Email validation
    paymentTime: z.string(), // Basic string validation for payment time
    totalAmount: z.number().optional(), // Optional number
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z
      .array(
        z.object({
          _id: z.instanceof(mongoose.Types.ObjectId).optional(), // Optional ObjectId
          date: z.string().optional(), // Optional string for date
          slots: z.array(z.string()).optional(), // Optional array of strings for slots
        })
      )
      .optional(),
    user: z.instanceof(mongoose.Types.ObjectId).optional(), // Optional ObjectId for user
    phone: z.string().optional(), // Optional string for phone number
    paymentId: z.string().optional(), // Optional string for payment ID
    email: z.string().email("Invalid email address").optional(), // Optional email validation
    paymentTime: z.string().optional(), // Optional string for payment time
    totalAmount: z.number().optional(), // Optional number for total amount
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).optional(),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  updateBookingValidationSchema,
};
