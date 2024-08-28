"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookings = void 0;
const mongoose_1 = require("mongoose");
const bookingModelSchema = new mongoose_1.Schema({
    room: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Rooms" },
    slots: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Slot" }],
    user: { type: mongoose_1.Schema.Types.ObjectId, required: [true, "User Id is required"], ref: "User" },
    date: { type: Date, required: [true, "date is required"] },
    totalAmount: { type: Number, required: [true, "total amount of selected slot"] },
    isConfirmed: { type: String, enum: ["confirmed", "unconfirmed", "canceled"], default: "unconfirmed" },
    isDeleted: { type: Boolean, default: false },
});
exports.Bookings = (0, mongoose_1.model)("Bookings", bookingModelSchema);
