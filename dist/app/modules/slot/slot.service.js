"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../erros/AppError"));
const room_model_1 = require("../Room/room.model");
const slot_model_1 = require("./slot.model");
const slot_utils_1 = require("./slot.utils");
const handleEmptyData_1 = __importDefault(require("../../utils/handleEmptyData"));
const addSlotDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check slot block or not
    const isRoomAvailable = yield room_model_1.Rooms.findById(payload.room);
    if (!isRoomAvailable) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room not found with this " + payload.room);
    }
    // check the slot shedule is available
    const isSlotAvailabe = yield slot_model_1.Slot.findOne({
        room: payload.room,
        date: payload.date,
    });
    if (isSlotAvailabe) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Slot Time is not available");
    }
    else
        return yield (0, slot_utils_1.createSlot)(payload.startTime, payload.endTime, payload.room, payload.date);
});
const getAllSlotDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.date || payload.roomId) {
        const result = yield slot_model_1.Slot.find({
            $or: [{ date: payload.date }, { room: payload.roomId }],
            isBooked: false,
        });
        return (0, handleEmptyData_1.default)(result);
    }
    else {
        const result = yield slot_model_1.Slot.find({ isBooked: false });
        return (0, handleEmptyData_1.default)(result);
    }
});
exports.slotService = {
    addSlotDb,
    getAllSlotDB,
};
