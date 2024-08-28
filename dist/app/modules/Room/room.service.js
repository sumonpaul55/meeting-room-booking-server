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
exports.roomsServices = void 0;
const room_model_1 = require("./room.model");
const handleEmptyData_1 = __importDefault(require("../../utils/handleEmptyData"));
const creatRooms = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.create(payLoad);
    return result;
});
// get a rooms
const getAllRoomsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.find();
    return (0, handleEmptyData_1.default)(result);
});
// get a rooms
const getAroomsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findById(id);
    return (0, handleEmptyData_1.default)(result);
});
// update rooms into db
const updateRoomsIntoDb = (id, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // const { amenities, ...restData } = payLoad;
    const result = yield room_model_1.Rooms.findByIdAndUpdate(id, payLoad, {
        new: true,
        runValidators: true,
    });
    console.log(result);
    return result;
});
const deleteRoomFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Rooms.findByIdAndUpdate(payload, { isDeleted: true }, { new: true });
    return result;
});
exports.roomsServices = {
    creatRooms,
    getAllRoomsFromDb,
    getAroomsFromDb,
    updateRoomsIntoDb,
    deleteRoomFromDb,
};
