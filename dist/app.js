"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middileWare/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middileWare/globalErrorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://meeting-room-booking-client.vercel.app"], credentials: true }));
app.use(express_1.default.json());
// application route
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hi, this is Room Booking Server 😁😀!");
});
app.use(notFound_1.default);
// global error
app.use(globalErrorHandler_1.default);
exports.default = app;
